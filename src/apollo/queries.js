import { gql } from "@apollo/client";
import client from "./client";

export const getMyTokens = async (wallet) => {
  console.log(wallet.toLowerCase());
  const res = await client.query({
    query: gql(tokensQuery(wallet.toLowerCase())),
  });

  console.log(res);
  return res.data;
};

export const getTokenInfo = async (tokenId) => {
  const res = await client.query({
    query: gql(tokenInfo(tokenId)),
  });

  console.log(res);
  return res.data;
};

export const getMarketItems = async () => {
  const res = await client.query({ query: gql(MARKET_ITEMS) });
  console.log(res);
  return res.data;
};

const tokensQuery = (wallet) => {
  return `
  query {
    holders(where: { id: "${wallet}" }) {
      id
      nftsOwned {
        id
        tokenURI
        forSale
        price, 
       
      }
    }
  }
  `;
};

const tokenInfo = (tokenId) => {
  return `
    query {
        characters(where: { id: ${tokenId}}) {
                   
            id
            tokenURI
            forSale
            price,
            currentOwner{
              id
            }
          
        }
    }
    `;
};

export const MARKET_ITEMS = `
        query {
            characters( where: { forSale: true  }){
                id
                tokenURI
                forSale
                price
                  currentOwner {
                  id,
                  numberOfnftsOwned
                }
              
                  
              }
        }

`;
