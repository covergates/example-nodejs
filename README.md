# example-nodejs
The is an example to show how to generate and upload coverage report to
[Covergates](https://covergates.com/) for NodeJS.

We use [Mocha](https://mochajs.org/) + [Istanbul](https://istanbul.js.org/) for example.
But it does not mean you can only use this combination.
Basically, [Covergates](https://covergates.com/) could work with any test framework that provides coverage report in `lcov` format.
More formats support is ongoing, you can find more detail on our [GitHub repository](https://github.com/covergates/covergates).

> It is assume that you have installed NodeJS version 12 or newer. If not, please refer to [Downloads](https://nodejs.org/en/download/) to get the latest version NodeJS.


## Fork the Repository

To get start, please for this repository at first by click the **Fork** on the top-right of the repository page.

![fork](https://raw.githubusercontent.com/covergates/example-nodejs/master/assets/fork.png)

After that, clone the repository to your workspace with:

```sh
git clone https://github.com/<your account>/example-nodejs.git
cd example-nodejs/mocha_instanbul
```

## Install Covergates

[Covergates](https://covergates.com/) is available on [NPM](https://www.npmjs.com/package/covergates).

In this example, you can run:

```
npm install
```

`covergates` binary will be installed under `node_modules/.bin/covergates`.

> The installation will download `covergates` binary from [https://github.com/covergates/covergates/releases](https://github.com/covergates/covergates/releases). If you have no network connection, please refer to [Command Line Tool](https://docs.covergates.com/start/cli/) to see how to download and install `covergates` manually.

To install `covergates` for your own repository, run:

```
npm install covergates --save-dev
```

## Generate Coverage Report

The test script is at `test/test.js`:

```js
var assert = require('assert');
const { test } = require('../src');

describe('test', function () {
  it('could not divide zero', function () {
    const msg = test(0, 0);
    assert.equal(msg, 'divider could not be zero');
  });
});
```

It tests the `test` function in `src/index.js`.
To test it, run:

```sh
npm test
```

You will see the output like below:

![test](https://raw.githubusercontent.com/covergates/example-nodejs/master/assets/test.png)

The coverage reports will be generated to `../coverage`:

![report](https://raw.githubusercontent.com/covergates/example-nodejs/master/assets/report.png)

## Activate Repository

Before we upload the coverage report, you need to activate repository on **Covergate**.
Visit [https://covergates.com/repo](https://covergates.com/repo) and click **ACTIVATE** right to the `example-nodejs` repository.

![repo](https://raw.githubusercontent.com/covergates/example-nodejs/master/assets/repo.png)

> If you are using self-hosted **Covergates**, please replace [https://covergates.com](https://covergates.com) to your domain name.

Visit repository setting page, you could find the **Report ID** which is used to upload report as below image shown:

![setting](https://raw.githubusercontent.com/covergates/example-nodejs/master/assets/setting.png)

## Upload Report

To upload report, you need to prepare:

1. `API_URL`: The API URL to **Covergate**
2. `REPORT_ID`: The Report ID found on the repository setting page.

You can pass these two variables with command line, for example:

```
npx covergates --url $API_URL upload --report $REPORT_ID --type lcov ../coverage/lcov.info"
```

The other way to setup these variables would be using `dotenv-cli` and `cross-var`, run:

```
npm install dotenv-cli cross-var --save-dev
```

Add `upload` to `scripts` in `package.json`:

```json
"upload": "dotenv -- cross-var covergates upload --type lcov ../coverage/lcov.info"
```

Create a `.env` file like this repository shows:

```
API_URL=https://covergates.com/api/v1
REPORT_ID=bt6f5k223akg009rj280
```

Replace the `API_URL` to your domain name if you are using self-hosted server and `REPORT_ID` to your own **Report ID**.

After that, run:

```sh
npm run upload
```

Visit your repository page to see the report!

## Notice

The test framework in this example uses [Istanbul](https://istanbul.js.org/) to generate coverage report.
It will use relative path in the report, for example:

```
TN:
SF:mocha_instanbul/src/index.js
FN:1,test
end_of_record
```

If your test framework using absolute path by default ([Jest](https://jestjs.io/en/) for example),
you will need to covert it to relative path or using **Filter** setting to remove it with regular expression.
Please refer to [Repository Setting](https://docs.covergates.com/start/setting/) for more detail.
