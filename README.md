# Go

## Setting up
- For Ubuntu: [Look here](https://www.linode.com/docs/development/go/install-go-on-ubuntu/)
- For MacOS: [Look here](http://sourabhbajaj.com/mac-setup/Go/README.html)
- Apart from above tutorial, add the following to your .bashrc:
```bash
              export GOBIN=$GOPATH/bin
```
- All your code (across projects) goes into one folder. So have your environment variables set up specific to where your code is.
- `bin` stores executables, `pkg` stores external packages, `src` has all your source code.

## Basics
- The [documentation](https://golang.org/doc/code.html) is very well written. You're all advised to go through it.
- The [Golang book](https://www.golang-book.com/books/intro) is an absolute **must** for you to understand the fundamentals of Go.
- Similar to C
- All referred code is up on [this repository](https://github.com/dheerajpreddy/Go-React-Boilerplate).
- [Hello world program](https://github.com/dheerajpreddy/Go-React-Boilerplate/blob/master/go/src/1%20-%20Hello%20world.go)
- [Defining packages](https://github.com/dheerajpreddy/Go-React-Boilerplate/blob/master/go/src/2%20-%20Using%20packages.go)
    - Functions inside a package must start with a capital letter. Or else they won't be accessible outside the package.
    - Each package must consist of a directory along with a .go file of the same name inside the directory.
- Installing third party packages; use `go get`. An example:-
```bash
        go get -u -v gopkg.in/mgo.v2
```
- Packages used in this tutorial -
```bash
              go get -u -v github.com/gin-gonic/gin
              go get -u -v github.com/jinzhu/gorm
              go get -u -v github.com/jinzhu/gorm/dialects/sqlite
              go get -u -v github.com/gin-contrib/cors
```
- To run a program:-
```bash
              go run file.go
```

# React

## Setting up
- First, install node. Then install yarn (because npm is not very nice)
- Ubuntu:
```bash
              curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
              sudo apt-get install -y nodejs
              npm install -g yarn
              yarn global add create-react-app
```
- MacOS:
```bash
              brew install node
              npm install -g yarn
              yarn global add create-react-app
```
- Then, create a new React application by running the following:
```bash
              create-react-app name_of_app
```
- You can run the app by running `yarn start`
- `node_modules` contains all your external packages.
- `package.json` is a json file that contains all the environment requirements of your project. It is similar to the `requirements.txt` file we saw for python.
- `public` stores some static content. The `index.html` file is going to render whatever code you write. You will need to change that based on your application's design.
- ```bash yarn build ``` builds your code into a production ready application. The contents are stored in the `build` directory.
- `src` contains all of your code. This should follow a good directory structure. Read more into it over [here](https://daveceddia.com/react-project-structure/).
- Alternate structure to follow can be found [here](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)
