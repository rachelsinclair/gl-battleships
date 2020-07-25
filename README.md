# gl-battleships

Task and background here: https://medium.com/guestline-labs/hints-for-our-interview-process-and-code-test-ae647325f400

First, I spent a ittle time considering functionality. I've already got some ideas about how I want to implement certain things, such as placement of ships on the gameboard. Let's not get too caught up in that yet. There's plenty more ground to cover first. 

Looked up Bowling Game kata - fell into a web of Uncle Bob articles about TDD.

## Envionment setup

This is the first time I've used Node in my current development OS, which is an Ubuntu-based Linux distro, so we're starting with the basics.

- Installed [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm): 
    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
    ```

- Installed latest version of NodeJS:
    ```
    nvm install node
    ```

- Created directory for the new repo, including this snazzy README file

- Created repo on GitHub and pushed out my first commit

- Initialised npm project: `npm init`

- Installed Mocha and Chai:
    ```
    npm i --save-dev mocha chai
    ```

- Created .gitignore file for the `node_modules` directory

This should be enough setup for me to crack on with the task. The fun begins tomorrow!