# Thor Calculator
This is a small package calculating thor generation rate based on 
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
$ thor <your VET amount> <X node status(true/false - default to false)>
$ thor 1550000 true     // sample, is X Node
$ thor 3450000 false    // sample, is not X Node
$ thor 1235000          // sample, default is not X Node
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

### Use it as a Nodejs Module([sample code](https://github.com/VechainCommunity/thor-calculator/blob/master/demo.js))

#### snippets
```javascript
const thorCalculator = require('./index');
const info = thorCalculator(1000000, false);
console.log(info);
```
#### print out
```javascript
{ 
  user: { 
     amount: 1000000,
     is_x_node: false,
     node_config: {},
     node_type: 'Strength Node',
     thor_generation_rate_per_vet: 0.0008605594405594406,
     thor_amount_per_day: 860.5594405594406 
  },
  blockain: { 
     nodes: { 
        Mjolnir_Nodes_Number: 200,
        Thunder_Nodes_Number: 300,
        Strnegth_Nodes_Number: 1000,
        Vethor_Nodes_Number: 2000 
     },
     baseRate: 0.0004405594405594406 
  } 
}
```

## Author
[Amazingandyyy](https://github.com/amazingandyyy)

## License
[MIT](https://github.com/VechainCommunity/thor-calculator/blob/master/license)


## Help
- PR
- issues
- stars
- forks
