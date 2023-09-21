const MOVE_LIT_REG = 0x10;
const MOVE_REG_REG = 0x11;
const MOVE_REG_MEM = 0x12;
const MOVE_MEM_REG = 0x13;
const ADD_REG_REG = 0x14;
const JMP_NOT_EQ = 0x15;
const PSH_LIT = 0X17;
const PSH_REG = 0X18;
const POP = 0X1A;
const CAL_LIT = 0X5E;
const CAL_REG= 0X5F;
const RET = 0X60;


module.exports = { RET, CAL_LIT, CAL_REG, POP, MOVE_LIT_REG, MOVE_REG_REG, PSH_LIT, PSH_REG,  MOVE_REG_MEM, MOVE_MEM_REG, ADD_REG_REG, JMP_NOT_EQ, }