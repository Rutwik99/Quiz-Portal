package main

import (
    "fmt"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "github.com/gin-gonic/contrib/static"
    "github.com/jinzhu/gorm"
    _ "github.com/go-sql-driver/mysql"
)

var db_quiz *gorm.DB
var err error

type CreateQuizForm struct {
    Title string `json:"title"`
    Genre string `json:"genre"`
    Questions []string `json:"questions"`
    Options [][]string `json:"options"`
    Answers [][]int `json:"answers"`
}

type RegisterForm struct {
    Name string `json:"name"`
    Email string `json:"email"`
    Password string `json:"password"`
    IsAdmin int `json:"isAdmin"`
}

type LoginForm struct {
    Email string `json:"email"`
    Password string `json:"password"`
    Type string `json:"type"`
}

type LoginSocial struct {
    Name string `json:"name"`
    Email string `json:"email"`
    Provider string `json:"provider"`
    Token string `json:"token"`
    ProfilePic string `json:"profile_pic"`
    ProviderID string `json:"provider_id"`
    Type string `json:"type"`
}

type Quiz struct {
    QuizID uint `gorm:"primary_key" json:"quiz_id"`
    QuizName string `json:"quiz_name"`
    QuizGenre string `json:"quiz_genre"`
    QuID []Question `gorm:"ForeignKey:quiz_id"`
}

type Question struct {
    QuizID uint `json:"quiz_id"`
    QuestionID uint `gorm:"primary_key" json:"question_id"`
    QuestionName string `json:"question_name"`
    QueID []Options `gorm:"ForeignKey:question_id"`
    // QuestionMultiAnswer int `json:"question_multi_answer"`
}

type Options struct {
    QuestionID uint `json:"question_id"`
    OptionsID uint `gorm:"primary_key" json:"options_id"`
    OptionsName string `json:"options_name"`
    CorrectAnswer int `json:"correct_answer"`
}

type UserName struct {
    // check unique key
    UserID uint `gorm:"primary_key" json:"user_id"`
    Name string `json:"name"`
    Email string `json:"email"`
    IsAdmin int `json:"is_admin"`
    UID UserPassword `gorm:"ForeignKey:user_id"`
}

type UserPassword struct {
    UserID uint `json:"user_id"`
    Email string `gorm:"primary_key" json:"email"`
    Password string `json:"password"`
}


type SocialUser struct {
    SocialUserID uint `gorm:"primary_key" json:"social_user_id"`
    SocialName string `json:"name"`
    SocialEmail string `json:"email"`
    Token string `gorm:"size:1000" json:"token"`
    ProviderID string `gorm:"size:1000" json:"provider_id"`
    // SocialPassword string `json:"password"`
}


func main () {
    db_quiz, err = gorm.Open("mysql", "root:root@/gorm?charset=utf8&parseTime=True&loc=Local")
    if err != nil {
        fmt.Println(err)
    }
    defer db_quiz.Close()

    db_quiz.AutoMigrate(&Quiz{}, &Question{}, &Options{}, &UserName{}, &SocialUser{}, &UserPassword{})
    db_quiz.Model(&Question{}).AddForeignKey("quiz_id", "quizzes(quiz_id)", "CASCADE", "CASCADE")
    db_quiz.Model(&Options{}).AddForeignKey("question_id", "questions(question_id)", "CASCADE", "CASCADE")
    db_quiz.Model(&UserPassword{}).AddForeignKey("user_id", "user_names(user_id)", "CASCADE", "CASCADE")

    r := gin.Default()
    r.Use(static.Serve("/", static.LocalFile("../../react-app/public", true)))
    // r.GET("/Genre", SelectGenre)
    // r.GET("/Leaderboard", CheckLeaderboard)
    // r.POST("/CreateQuiz", NewCreateQuiz)
    // r.GET("/ViewQuiz", AllViewQuiz)
    // r.DELETE("/DeleteQuiz", RemoveDeleteQuiz)
    // r.POST("/SocialLogin", SocialLoginPage)
    r.GET("/Quizzes/", AllViewQuiz)
    r.GET("/PlayQuiz/:id", PlayQuiz)
    r.POST("/Quizzes/", NewCreateQuiz)
    // r.DELETE("/Quizzes/:id", RemoveDeleteQuizDelete)
    r.POST("/SignUp/", SignUpPage)
    r.POST("/Login/", LoginPage)
    r.POST("/SocialLogin/", SocialLoginPage)
    // r.POST("/")
    r.Use((cors.Default()))
    r.Run(":8080")
}

func CheckLeaderboard(c *gin.Context) {
    c.Header("access-control-allow-origin", "*")
}

func NewCreateQuiz(c *gin.Context) {
    var form CreateQuizForm
    var quiz Quiz
    c.BindJSON(&form)
    quiz.QuizName = form.Title
    quiz.QuizGenre = form.Genre
    db_quiz.Create(&quiz)

    length1 := len(form.Questions)
    for i := 0; i < length1; i++ {
        var ques Question
        ques.QuizID = quiz.QuizID
        ques.QuestionName = form.Questions[i]
        db_quiz.Create(&ques)
        for j := 0; j < 4; j++ {
            var opt Options
            opt.QuestionID = ques.QuestionID
            opt.OptionsName = form.Options[i][j]

            length2 := len(form.Answers[i])
            for k := 0; k < length2; k++ {
                if form.Answers[i][k] == j {
                    opt.CorrectAnswer = 1
                    break;
                } else {
                    opt.CorrectAnswer = 0
                }
            }
            db_quiz.Create(&opt)
        }
    }
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, quiz);
}

func AllViewQuiz(c *gin.Context) {
    var quiz []Quiz
    if err := db_quiz.Find(&quiz).Error; err != nil {
        c.AbortWithStatus(404)
        fmt.Println(err)
    } else {
        c.Header("access-control-allow-origin", "*")
        c.JSON(200, quiz)
    }
}

func PlayQuiz(c *gin.Context) {
    c.Header("access-control-allow-origin", "*")
    id := c.Params.ByName("id")
    // var quiz []Quiz
    var ques []Question
    var ques_str []string
    db_quiz.Table("questions").Select("questions.question_id, questions.question_name").Joins("INNER JOIN quizzes ON questions.quiz_id = quizzes.quiz_id AND quizzes.quiz_id = ?", id).Scan(&ques);
    for i := 0; i < len(ques); i++ {
        ques_str = append(ques_str, ques[i].QuestionName)
    }
    opt := make([][]Options, len(ques))
    opt_str := make([][]string, len(ques))
    opt_corr := make([][]int, len(ques))
    for i := 0; i < len(ques); i++ {
        db_quiz.Table("options").Select("options.options_name, options.correct_answer").Joins("INNER JOIN questions ON options.question_id = questions.question_id").Where("options.question_id = ?", ques[i].QuestionID).Scan(&opt[i]);
        for j := 0; j < 4; j++ {
            opt_str[i] = append(opt_str[i], opt[i][j].OptionsName)
            if(opt[i][j].CorrectAnswer == 1) {
                opt_corr[i] = append(opt_corr[i], j)
            }
        }
        // fmt.Println(opt_corr[i])
    }

    c.JSON(200, gin.H{"questions": ques_str, "options": opt_str, "answers": opt_corr})
}

func RemoveDeleteQuiz(c *gin.Context) {
    quizid := c.Params.ByName("quiz_id")
    var quiz Quiz
    d := db_quiz.Where("quiz_id = ?", quizid).Delete(&quiz)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, gin.H{"quiz_id #" + quizid: "deleted"})
}

func SignUpPage(c *gin.Context)  {
    var regform RegisterForm
    var username UserName
    var userpass UserPassword
    c.BindJSON(&regform)
    // username.IsAdmin = 1
    // fmt.Println(user.Name, user.IsAdmin)
    username.Name = regform.Name
    username.Email = regform.Email
    username.IsAdmin = regform.IsAdmin
    db_quiz.Create(&username)
    userpass.Email = regform.Email
    userpass.Password = regform.Password
    userpass.UserID = username.UserID
    db_quiz.Create(&userpass)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, regform)
}

func LoginPage(c *gin.Context) {
    c.Header("access-control-allow-origin", "*")
    var logform LoginForm
    var userpass UserPassword
    var username UserName
    c.BindJSON(&logform)
    email := logform.Email
    password := logform.Password
    // fmt.Println(email, password)
    if err := db_quiz.Where(&UserPassword{Email: email, Password: password}).First(&userpass).Error; err != nil {
        // c.AbortWithStatus(404)
        // fmt.Println(err)
        c.JSON(200, gin.H{"message": "Incorrect Details"})
        // Extension -- Write message if incorrect details
        // c.JSON(200, gin.H{"message": "Hello",})
    } else {
        // c.JSON(200, logform)
        if err = db_quiz.Where(&UserName{Email: email}).First(&username).Error; err != nil {
            c.JSON(200, gin.H{"message": "Incorrect Details"})
        }
        c.JSON(200, gin.H{"message": "Success", "email": email, "name": username.Name})
    }
}

func SocialLoginPage(c *gin.Context) {
    c.Header("access-control-allow-origin", "*")
    var logsocial LoginSocial
    var socialuser SocialUser
    c.BindJSON(&logsocial)
    email := logsocial.Email
    // password := logsocial.Password
    if err := db_quiz.Where(&SocialUser{SocialEmail: email}).First(&socialuser).Error; err != nil {
        socialuser.SocialName = logsocial.Name
        socialuser.SocialEmail = logsocial.Email
        socialuser.Token = logsocial.Token
        socialuser.ProviderID = logsocial.ProviderID
        db_quiz.Create(&socialuser)
        c.JSON(200, gin.H{"message": "Success"})
        // Extension -- Write message if incorrect details
    } else {
        // c.JSON(200, logform)
        c.JSON(200, gin.H{"message": "Success"})
    }
    // c.JSON(200, gin.H{"message": "Success"})
}
