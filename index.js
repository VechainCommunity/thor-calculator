#!/usr/bin/env node

/* REFERENCE TO OFFCICAL DOCUMENTATION
# nodes: 
https://medium.com/@vechainofficial/vechain-apotheosis-part-ii-thor-power-forged-974111a93278 

# x-nodes: 
https://medium.com/@vechainofficial/vechain-x-series-6b77b746b4b2
*/ 
const Table = require('cli-table2');
const axios = require('axios');
const chalk = require('chalk');
var Spinner = require('cli-spinner').Spinner;

const Million = 1000000;
const Base_Thor_Rate = 0.00042; // VTHO per VET per Day
const Foundation_Reward_Pool_Amount = 150 * Million * 100;
const Foundation_X_Reward_Pool_Amount = 50 * Million * 100;
const Authority_Node_Number = 101;
const Requirement = {
  Authority: 25 *Million,
  Mjolnir:  15  *Million,
  Thunder:  5   *Million,
  Strength: 1   *Million
}
const RequirementXBonus = 0.6*Million;
const Ecosystem = {
  Mjolnir_Nodes_Number: 200,
  Thunder_Nodes_Number: 300,
  Strnegth_Nodes_Number: 1000,
  Vethor_Nodes_Number: 2000
}

const getBaseRate = (
  Mjolnir_Nodes_Number = Ecosystem.Mjolnir_Nodes_Number,
  Thunder_Nodes_Number = Ecosystem.Thunder_Nodes_Number,
  Strnegth_Nodes_Number = Ecosystem.Strnegth_Nodes_Number
) => {
  const B = Base_Thor_Rate                                   // Base VeThor generation rate for 1 VET held (0.00042 VeThor a day);
  const FR = Foundation_Reward_Pool_Amount                   // Amount of VET distributed from the Foundation Reward Pool (150 million VET);
  const F = FR*B                                             // Amount of VeThor the Foundation Reward Pool generates per Day (150 million VET x 0.00042 = 63000 VeThor);
  const A = Authority_Node_Number*Requirement['Authority']   // Number of Authority Node designated VET (101 nodes x 250000 = 25250000 VET);
  const M = Mjolnir_Nodes_Number*Requirement['Mjolnir']      // Number of Mjolnir nodes designated VET (variable);
  const T = Thunder_Nodes_Number*Requirement['Thunder']      // Number of Thunder nodes designated VET (variable);
  const S = Strnegth_Nodes_Number*Requirement['Strength']    // Number of Strength nodes designated VET (variable);

  const NB = F/(2*A + 2*M + 1.5*T + 1*S);
  return NB;
}
const getXBaseRate = (
  Mjolnir_Nodes_Number = Ecosystem.Mjolnir_Nodes_Number,
  Thunder_Nodes_Number = Ecosystem.Thunder_Nodes_Number,
  Strnegth_Nodes_Number = Ecosystem.Strnegth_Nodes_Number,
  Vethor_Nodes_Number = Ecosystem.Vethor_Nodes_Number
) => {
// const getXBaseRate = (Mjolnir_Nodes_Number=79, Thunder_Nodes_Number=102, Strnegth_Nodes_Number=522, Vethor_Nodes_Number=1447) => {
  const B = Base_Thor_Rate                                 // Base VeThor generation rate for 1 VET held (0.00042 VeThor a day);
  const FRX = Foundation_X_Reward_Pool_Amount
  const FX = FRX*B
  const M = Mjolnir_Nodes_Number*(Requirement['Mjolnir']+RequirementXBonus)
  const T = Thunder_Nodes_Number*(Requirement['Thunder']+RequirementXBonus)
  const S = Strnegth_Nodes_Number*(Requirement['Strength']+RequirementXBonus)
  const V = Vethor_Nodes_Number*RequirementXBonus
  
  const NBX = FX/(2*M + 1.5*T + 1*S + 0.25*V);
  return NBX;
}

const nodeTypes = {
  'economic_nodes': {
    Thrudheim:'Thrudheim Node',
    Mjolnir: 'Mjolnir Node',
    Thunder: 'Thunder Node',
    Strength: 'Strength Node',
  },
  'x_nodes': {
    Mjolnir: 'Mjolnir X Node',
    Thunder: 'Thunder X Node',
    Strength: 'Strength X Node',
    VeThor: 'VeThor X Node'
  }
}

function calcType(isX=false, amount){
  if(isX){
    if(amount>=Requirement['Mjolnir']+RequirementXBonus){
      return nodeTypes['x_nodes']['Mjolnir']
    }
    if(amount>=Requirement['Thunder']+RequirementXBonus){
      return nodeTypes['x_nodes']['Thunder']
    }
    if(amount>=Requirement['Strength']+RequirementXBonus){
      return nodeTypes['x_nodes']['Strength']
    }
    if(amount>=RequirementXBonus){
      return nodeTypes['x_nodes']['VeThor']
    }
  }
  if(!isX){
    if(amount>=Requirement['Mjolnir']){
      return nodeTypes['economic_nodes']['Mjolnir']
    }
    if(amount>=Requirement['Thunder']){
      return nodeTypes['economic_nodes']['Thunder']
    }
    if(amount>=Requirement['Strength']){
      return nodeTypes['economic_nodes']['Strength']
    }
  }
  return 'NONE';
}

const BonusRate = {
  [nodeTypes['economic_nodes']['Mjolnir']]: 200,
  [nodeTypes['economic_nodes']['Thunder']]: 150,
  [nodeTypes['economic_nodes']['Strength']]: 100,
  [nodeTypes['x_nodes']['Mjolnir']]: 200,
  [nodeTypes['x_nodes']['Thunder']]: 150,
  [nodeTypes['x_nodes']['Strength']]: 100,
  [nodeTypes['x_nodes']['VeThor']]: 25,
}

const Info = (amount, isX=false, config={}) => {
  this.user = {};
  this.blockain = {};
  this.user.amount = amount;
  this.user.is_x_node = isX;
  this.user.node_config = config;
  this.blockain.nodes = Ecosystem;
  if(!this.user.is_x_node){
    const { M, T, S } = this.user.node_config;
    this.blockain.baseRate = getBaseRate(M, T, S);
    this.user.node_type = calcType(this.user.is_x_node, this.user.amount);
    this.user.thor_generation_rate_per_vet = Base_Thor_Rate + (this.blockain.baseRate * BonusRate[this.user.node_type]/100);
    this.user.thor_amount_per_day = this.user.amount * this.user.thor_generation_rate_per_vet;
  }
  if(this.user.is_x_node){
    const { M, T, S, V } = this.user.node_config;
    this.blockain.baseRate = getBaseRate(M, T, S);
    this.blockain.xBaseRate = getXBaseRate(M, T, S, V);
    this.user.node_type = calcType(this.user.is_x_node, this.user.amount);
    this.user.thor_generation_rate_per_vet = Base_Thor_Rate + (this.blockain.baseRate * BonusRate[this.user.node_type]/100) + (this.blockain.xBaseRate * BonusRate[this.user.node_type]/100);
    this.user.thor_amount_per_day = this.user.amount * this.user.thor_generation_rate_per_vet;
  }
  return this;
}

let vtho_price = 0.002;
let spinner;
if(process.argv[2]){
  spinner = new Spinner('%s calculating...');
  spinner.setSpinnerString('⢹⢺⢼⣸⣇⡧⡗⡏');
  console.log(``);
  spinner.start();
  axios.get('http://api.lbank.info/v1/ticker.do?symbol=eth_usdt')
  .then(r=>{
    const eth_price_in_usdt = r.data.ticker.latest;
    axios.get('http://api.lbank.info/v1/ticker.do?symbol=vtho_eth')
    .then(r=>{
      const vtho_price_in_eth = Number(r.data.ticker.latest);
      vtho_price = (vtho_price_in_eth * eth_price_in_usdt).toFixed(8);
      axios.get('http://api.lbank.info/v1/ticker.do?symbol=vet_usdt')
      .then(r=>{
        const vet_price_in_usdt = Number(r.data.ticker.latest);
        const current_timestamp = new Date(r.data.timestamp);
        const current_date_time = `${current_timestamp.toLocaleDateString()} ${current_timestamp.toLocaleTimeString()}`;
        spinner.stop();
        console.log(``);
        console.log(``);
        print({current_date_time, vtho_price, vet_price_in_usdt});
      })
    }).catch(err=>console.error(err));
  }).catch(err=>console.error(err));
}

const print = ({ current_date_time, vtho_price, vet_price_in_usdt }) => {
  const user_vet_amount = (process.argv[2].includes('M')) ? Number(process.argv[2].split('M')[0]*Million):Number(process.argv[2]) || 1*Million;
  const user_is_x = (process.argv[3]==='true');
  const info = Info(user_vet_amount, user_is_x);
  const user_type = info.user.node_type;
  const per_day = info.user.thor_generation_rate_per_vet*user_vet_amount;
  var table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });
  table.push(
    { 'VET Amount': chalk.green(`${user_vet_amount} VET($${vet_price_in_usdt*user_vet_amount})`) },
    { 'Node Type': chalk.yellow(`${user_type}`) },
    { 'Generation': 
      [`${per_day.toFixed(8)} vtho/day`,
      `${(per_day * 30).toFixed(8)} vtho/month`,
      `${(per_day * 365).toFixed(8)} vtho/year`]
    },
    { 
      Profits: [chalk.green(`$${(per_day * vtho_price).toFixed(3)}/day`),
      `$${(per_day * vtho_price * 30).toFixed(3)}/month`,
      `$${(per_day * vtho_price * 365).toFixed(3)}/year`]
    },
    {
      'Annual Return': 
      `${((per_day * vtho_price * 365)/(vet_price_in_usdt*user_vet_amount)*100).toFixed(2)}%`
    }
  );
  console.log(table.toString());
  console.log(`> VET's current price at ${chalk.bold(`$${vet_price_in_usdt}`)} on LBank`);
  console.log(`> VTHO's current price at ${chalk.bold(`$${vtho_price}`)} on LBank`);
  console.log('> resource: https://github.com/VechainCommunity/thor-calculator')
  console.log(`> current time: ${current_date_time}`);
  console.log(``);
}

module.exports = Info;