#!/usr/bin/env node

/* eslint-disable */

/* REFERENCE TO OFFCICAL DOCUMENTATION
# nodes: 
https://medium.com/@vechainofficial/vechain-apotheosis-part-ii-thor-power-forged-974111a93278 

# x-nodes: 
https://medium.com/@vechainofficial/vechain-x-series-6b77b746b4b2
*/ 

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

const getBaseRate = (Mjolnir_Nodes_Number=667, Thunder_Nodes_Number=500, Strnegth_Nodes_Number=3000) => {
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
const getXBaseRate = (Mjolnir_Nodes_Number=207, Thunder_Nodes_Number=288, Strnegth_Nodes_Number=1078, Vethor_Nodes_Number=2083) => {
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

getBaseRate()
getXBaseRate()


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

const getNodeRate = (amount, isX, config={}) => {
  if(!isX){
    const { M, T, S } = config;
    const baseRate = getBaseRate(M, T, S);
    const type = calcType(isX, amount);
    const formula = Base_Thor_Rate + (baseRate * BonusRate[type]/100);
    return amount * formula;
  }
  if(isX){
    const { M, T, S, V } = config;
    const baseRate = getBaseRate(M, T, S);
    const xBaseRate = getXBaseRate(M, T, S, V);
    const type = calcType(isX, amount);
    const formula = Base_Thor_Rate + (baseRate * BonusRate[type]/100) + (xBaseRate * BonusRate[type]/100);
    return amount * formula;
  }
  return amount * formula;
}

const vtho_price = 0.002;
const user_vet_amount = (process.argv[2].includes('M')) ? Number(process.argv[2].split('M')[0]*Million):Number(process.argv[2]) || 1*Million;
const user_is_x = !!process.argv[1] || false;
const user_type = calcType(user_is_x, user_vet_amount)
const per_day = getNodeRate(user_vet_amount, user_is_x);

console.log('Amount: \t', user_vet_amount, 'VET');
console.log('NodeType: \t', `${user_type}`);
console.log('Generate: \t', per_day.toFixed(4), 'vtho/day');
console.log('\x1b[32mWorth: \t\t', `$${(per_day * vtho_price).toFixed(2)}/day (based on $${vtho_price}/vtho)\x1b[0m`);

module.exports = getNodeRate;