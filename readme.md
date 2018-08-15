# Thor Calculator

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
$ thor 1000000 true
$ thor <your VET amount> <is X node(true/>false)>
```

*Note you can also use Million(**M**) shorthand*

```terminal
$ thor 1M true
```

#### Sample Respond

```terminal
Amount:          1000000 VET
NodeType:        VeThor X Node
Generate:        517.6123 vtho/day
Worth:           $1.04/day (based on $0.002/vtho)
```

#### Another example
```terminal
$ thor 5.77M true
```

#### Sample Respond

```terminal
Amount:          5770000 VET
NodeType:        Thunder X Node
Generate:        5802.7392 vtho/day
Worth:           $11.61/day (based on $0.002/vtho)
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