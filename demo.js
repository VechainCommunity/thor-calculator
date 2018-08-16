// const getThorRate = require('thor-calculator');
const thorPerDay = require('./index');

const info = thorPerDay(1000000, false);
console.log(info);

// print out
// { 
// user:
//    { amount: 1000000,
//      is_x_node: false,
//      node_config: {},
//      node_type: 'Strength Node',
//      thor_generation_rate_per_vet: 0.0008605594405594406,
//      thor_amount_per_day: 860.5594405594406 },
//   blockain:
//    { nodes:
//       { Mjolnir_Nodes_Number: 200,
//         Thunder_Nodes_Number: 300,
//         Strnegth_Nodes_Number: 1000,
//         Vethor_Nodes_Number: 2000 },
//      baseRate: 0.0004405594405594406 } 
// }
