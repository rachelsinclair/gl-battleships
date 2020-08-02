# gl-battleships

Task and background here: https://medium.com/guestline-labs/hints-for-our-interview-process-and-code-test-ae647325f400

First, I spent a little time considering functionality. I've already got some ideas about how I want to implement certain things, such as placement of ships on the gameboard. Let's not get too caught up in that yet. There's plenty more ground to cover first. 

Looked up Bowling Game kata - fell into a web of Uncle Bob articles about TDD.

## My journey

### Setting up my environment

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

---

...aaaaaaaaaaaand then I decided we should give TypeScript a go.

- Installed a bunch of TS packages:
    ```
    npm install typescript ts-node @types/chai @types/mocha @types/node --save-dev
    ```

- Initialised tsconfig.jscon with a script based on [this handy script from Khalil Stemmler](https://khalilstemmler.com/blogs/typescript/node-starter-project/):
    ```
    npx tsc --init --rootDir src --outDir build \
    --esModuleInterop --resolveJsonModule --target ES6 \
    --module commonjs --allowJs true --noImplicitAny true
    ```
    NB: the original script was giving me issues with 'console' so removed --lib option and added --target after reading the [TS compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

- Created src and build folders and added the latter to .gitignore)

- Amended mocha test script in package.json to look for tests in the correct files.

Why did I think it was a good idea to do this to myself. Why.

---

### The dark night of the soul

This is roughly the point where the crisis of confidence hit its peak. I shuffled around the location of the TS files, made a couple of trivial adjustments in the configuration... pretty much anything to avoid actually writing code.

Try as I might, nothing was coming through. I was stuck in a rut. So, I stepped away from the computer for a good long while, downed water and painkillers and waited for the tension headache subside. Then I came back.

---

### The first test

It has been written. It can only get better from here.