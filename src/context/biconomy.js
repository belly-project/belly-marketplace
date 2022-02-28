import {Biconomy} from "@biconomy/mexa";
import {Web3} from web3;
const biconomy = new Biconomy(<web3 provider>,{apiKey: <API Key>, debug: true});
web3 = new Web3(biconomy);