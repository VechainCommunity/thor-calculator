# Thor Calculator

## install

```
$ npm i thor-calculator
```

## Use it in CLI

```
$ thor 1000000 true
$ thor <your VET amount> <is X node(true/>false)>
```

### you can also use Million(M) shorthand

```
$ thor 1M true
```

### Sample Respond

```
Amount:          1000000 VET
NodeType:        VeThor X Node
Generate:        517.6123 vtho/day
Worth:           $1.04/day (based on $0.002/vtho)
```

## Use it in node

```javascript
import getThorRate from 'thor-calculator';
const thorRate = getThorRate(1000000, false);
console.log(thorRate)
```