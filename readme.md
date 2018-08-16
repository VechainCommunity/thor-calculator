# Thor Calculator
This is a package the calculating thor generation rate based on 
- [Offical Node docs](https://medium.com/@vechainofficial/vechain-apotheosis-part-ii-thor-power-forged-974111a93278 )
- [Official Vechain X Node Guideline](https://medium.com/@vechainofficial/vechain-x-series-6b77b746b4b2)

## installation

### Install from NPM

```terminal
$ npm i thor-calculator -g    // for CLI tool
$ npm i thor-calculator -save // for node_modules usage
```

### Install from yarn

```terminal
$ yarn add thor-calculator
```

### Demo
<img src="https://media.giphy.com/media/7JyI4O4H4T73Y7BZv1/giphy.gif" width="80%" />


## Usage

### Use it in CLI

```terminal
$ thor <your VET amount> <X node status(true/false)>
$ thor 1000000 true
```

*Note you can also use Million(**M**) shorthand*

```terminal
$ thor 1.55M true
```

#### Sample Respond

```terminal
⡏ calculating...

╔═══════════════╤═══════════════════════╤═══════════════════════════════════════════════════════╗
║ VET Amount    │ 1550000 VET($12074.5) │                                                       ║
╟───────────────┼───────────────────────╢                                                       ║
║ Node Type     │ VeThor X Node         │                                                       ║
╟───────────────┼───────────────────────┼───────────────────────────╤───────────────────────────╢
║ Generation    │ 898.05355620 vtho/day │ 26941.60668600 vtho/month │ 327789.54801296 vtho/year ║
╟───────────────┼───────────────────────┼───────────────────────────┼───────────────────────────╢
║ Profits       │ $1.542/day            │ $46.254/month             │ $562.762/year             ║
╟───────────────┼───────────────────────┼───────────────────────────╧───────────────────────────╢
║ Annual Return │ 4.66%                 │                                                       ║
╚═══════════════╧═══════════════════════╧═══════════════════════════════════════════════════════╝
> VET's current price at $0.00779 on LBank
> VTHO's current price at $0.00171684 on LBank
> resource: https://github.com/VechainCommunity/thor-calculator
> current time: 2018-8-15 18:52:00

```

#### Another example
```terminal
$ thor 5.678M false
```

#### Sample Respond

```terminal

⡗ calculating...

╔═══════════════╤════════════════════════╤═════════════════════════════════════════════════════════╗
║ VET Amount    │ 5678000 VET($44515.52) │                                                         ║
╟───────────────┼────────────────────────╢                                                         ║
║ Node Type     │ Thunder Node           │                                                         ║
╟───────────────┼────────────────────────┼────────────────────────────╤────────────────────────────╢
║ Generation    │ 6137.00475524 vtho/day │ 184110.14265734 vtho/month │ 2240006.73566434 vtho/year ║
╟───────────────┼────────────────────────┼────────────────────────────┼────────────────────────────╢
║ Profits       │ $10.424/day            │ $312.724/month             │ $3804.808/year             ║
╟───────────────┼────────────────────────┼────────────────────────────╧────────────────────────────╢
║ Annual Return │ 8.55%                  │                                                         ║
╚═══════════════╧════════════════════════╧═════════════════════════════════════════════════════════╝
> VET's current price at $0.00784 on LBank
> VTHO's current price at $0.00169857 on LBank
> resource: https://github.com/VechainCommunity/thor-calculator
> current time: 2018-8-15 18:52:31

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
