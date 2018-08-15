# Thor Calculator
This is a package the calculating thor generation rate based on 
- [Offical Node docs](https://medium.com/@vechainofficial/vechain-apotheosis-part-ii-thor-power-forged-974111a93278 )
- [Official Vechain X Node Guideline](https://medium.com/@vechainofficial/vechain-x-series-6b77b746b4b2)

## installation

### Install from NPM

```terminal
$ npm i thor-calculator
```

### Install from yarn

```terminal
$ yarn add thor-calculator
```

## Usage

### Use it in CLI

```terminal
$ thor <your VET amount> <X node status(true/false)>
$ thor 1000000 true
```

*Note you can also use Million(**M**) shorthand*

```terminal
$ thor 1.123M false
```

#### Sample Respond

```terminal
╔════════════╤════════════════════════════════════╗
║ VET Amount │ 1123000 VET                        ║
╟────────────┼────────────────────────────────────╢
║ Node Type  │ VeThor X Node                      ║
╟────────────┼────────────────────────────────────╢
║ Generation │ 650.65428620 vtho/day              ║
╟────────────┼────────────────────────────────────╢
║ Worth      │ $ 1.301/day (based on $0.002/vtho) ║
╚════════════╧════════════════════════════════════╝
resource: https://github.com/VechainCommunity/thor-calculator
```

#### Another example
```terminal
$ thor 5.6M true
```

#### Sample Respond

```terminal
╔════════════╤═════════════════════════════════════╗
║ VET Amount │ 5600000 VET                         ║
╟────────────┼─────────────────────────────────────╢
║ Node Type  │ Thunder X Node                      ║
╟────────────┼─────────────────────────────────────╢
║ Generation │ 7707.48354085 vtho/day              ║
╟────────────┼─────────────────────────────────────╢
║ Worth      │ $ 15.415/day (based on $0.002/vtho) ║
╚════════════╧═════════════════════════════════════╝
resource: https://github.com/VechainCommunity/thor-calculator
```

### Use it as a Nodejs Module

```javascript
import getThorRate from 'thor-calculator';
const thorRate = getThorRate(1000000, false);
console.log(thorRate)
```

*Note you can check demo [here](https://github.com/VechainCommunity/thor-calculator/blob/master/demo.js)*

## Author
[Amazingandyyy](https://github.com/amazingandyyy)

## License
[MIT](https://github.com/VechainCommunity/thor-calculator/blob/master/license)