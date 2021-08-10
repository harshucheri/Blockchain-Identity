# Digital-Identity using ERC 725/735

An implementation of [ERC 725](https://github.com/ethereum/EIPs/issues/725) and [ERC 735](https://github.com/ethereum/EIPs/issues/735), proposed standard for managing **Digital Identity** on the **Blockchain**.

Using [ERC 725](https://github.com/ethereum/EIPs/issues/725), a **Smart Contract** can protect function calls from being executed unless the **Sender** has a verified **Claim** from a trusted **Issuer**; e.g. build a mechanism into our Smart Contracts to only allow interactions from reputable people. ERC-725 allows for many more use-cases, such as multi-sig execution approvals and verification by contract call instead of key validation.

## Issuer Services
- [x] Live Demo: [https://identity.vboss.tech](https://identity.vboss.tech)
- [x] Certifiers provides Issuer-Services: 
  - [x] Has Phone
  - [x] Has Email
  - [x] [Has Facebook](https://developers.facebook.com/)
  - [x] [Has Linked-in](https://developer.linkedin.com/)
  - [x] [Has Google](https://console.cloud.google.com/apis/credentials)
  - [x] [Has Github](https://github.com/settings/developers)
  - [x] [Has Twitter](https://apps.twitter.com/) 

- Meta-Mask Secret Backup Phrase: `rival alley punch barrel baby other taxi cannon pause achieve caution race`


## Explanation

Imagine we want to deploy a Listing contract to sell a Airplane ticket, but only allow interactions from
users with a verified email address. How can we accomplish this with ERC 725?

First, lets define the entities that will be interacting:

* The _Consumer_ is an identity who wants to buy the ticket.
* The _Issuer_ is an identity which issues claims of type 'EMAIL_VERIFIED' & 'PHONE_VERIFIED'.
* The _Listing_ will only allow _Consumers_ with an _EMAIL_VERIFIED_ & _PHONE_VERIFIED_ claim from an _Issuer_ they trust.

This leaves us with a few questions...

1. How does the trusted Issuer verify an email address?
2. How does the Consumer get an EMAIL_VERIFIED & _PHONE_VERIFIED_ claim onto their Identity?
3. How can the Listing verify that the Consumer has an EMAIL_VERIFIED & _PHONE_VERIFIED_ claim from a trusted Issuer?

To answer these questions, lets go through the process of setting up all the required contracts and services, starting
with the Issuer.

The job of the Issuer is to act as a trusted third party. In the future, trusted organizations may deploy their own
Issuer identity contracts onto the blockchain, which third parties can then trust. Origin plan to offer their own basic
Issuer contracts for verifying email addresses, phone numbers, Facebook accounts, Twitter accounts, etc. Third parties
will then be able to trust that these Origin Issuer contracts only issue claims if they are, in fact, true.

How will an email verifier work? A typical verification service may involve an application, for example
http://example.com/verify-email. This application will have a standard interface for verifying an email
address, whereby a user is sent an email with a special code which they then submit back to the application. Now that
the email address has been verified, it can be signed with a private key known only to the email verifier app. The
corresponding public key is on the issuer's identity. This is how a claim is verified.

More explanation to follow...

## Walkthrough

1. Screen upon loading

![image](https://user-images.githubusercontent.com/673455/38565794-1096067c-3c97-11e8-9f37-fce66f5f4fc4.png)

2. Confirm that the first wallet ID is active. (`0x313AaD` in our screenshot) We are playing the role of a person who desires a blockchain identity.

2. Click "Add an Identity" and deploy an identity contract with name "Alice".

![image](https://user-images.githubusercontent.com/673455/38565831-2adbb70c-3c97-11e8-937b-532b53513709.png)

You can see the address of the contract, as well as the wallet ID of the owner. 

3. Switch the active wallet to the second. (`0x56BEaa` in our screenshot) We are now playing the role of a service that can verify a GitHub account.

4. Click "Add a Certifier" and deploy a certifier contract called "Github". For now we'll use an example URL for our service. 

![image](https://user-images.githubusercontent.com/673455/38567509-3fcf75dc-3c9b-11e8-836d-f419ec3297a0.png)

Again, you should see the address of this contract, and the walled ID of the owner of this contract. 

5. Switch the active wallet to the third. (`0xCd5e74` in our screenshot) We are now playing the role of an eBay-like application that wants to restrict access to only people with verified Github accounts. (A marketplace for developers, perhaps!)

6. Click "Add a Protected Contract" and deploy a contract called "Listing" with certifier of "Github". This is the contract which will be limited to interacting to people with verified Github accounts. 

![image](https://user-images.githubusercontent.com/673455/38567736-c6f6c1aa-3c9b-11e8-9f12-99382fcbb022.png)

7. The screen should now look like this. 

![image](https://user-images.githubusercontent.com/673455/38567778-e0a15764-3c9b-11e8-9b15-471d0e0b866a.png)

8. Switch to the first wallet, belonging to "Alice". 
9. Click on the "Listing" contract. 
10. Click on "Run Protected Method", and switch the desired Claim Type to "Has GitHub",

![image](https://user-images.githubusercontent.com/673455/38567913-2c2d0fa2-3c9c-11e8-8337-38f6cbf0e3fb.png)

11. After clicking on "Check Claim", you should see that the claim is returned as **ClaimInvalid**. At this point, Alice has no proof that she has a GitHub account. 

![image](https://user-images.githubusercontent.com/673455/38567999-61cdea46-3c9c-11e8-9674-d53173357d51.png)

12. Switch to the second wallet, and click on "GitHub" under "Certifiers".

13. On right column, click on the "+" next to "Claims" to add a claim. 

14. Switch the "Claim Type" to "Has Github" and click "Add Claim". 

![image](https://user-images.githubusercontent.com/673455/38568558-cbe42048-3c9d-11e8-80e4-00ff66e595eb.png)

15. Switch to the first wallet, and click on the "Alice" identity. 

16. In right column, you should see the claim by our "Github" Certifier (from pervious step) that she has a GitHub account. Click "Approve" to accept this claim to Alice's identity. 

![image](https://user-images.githubusercontent.com/673455/38568275-22da173c-3c9d-11e8-9f98-97f576775346.png)

17. Alice now has on-chain proof of her GitHub!

![image](https://user-images.githubusercontent.com/673455/38568345-44acf5f0-3c9d-11e8-88b9-0b46e75b3926.png)

18. Now click the "Listing" under "Protected Contracts", and then click on "Run Protected Method". Change the "Claim Type" to "Has Github" 

19. You should see that this claim is returned as **ClaimValid***. 

![image](https://user-images.githubusercontent.com/673455/38568456-8f40e86a-3c9d-11e8-9e19-50dc9606ef5d.png)

Alice is ready to start shopping!


## Local Development

### Install NVM & Yarn
```              
  nvm install v9.11.1                                                                                &&
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg     | sudo apt-key add -                         &&
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list &&
  sudo apt-get update && sudo apt-get install yarn
```

### Installation 
```
  # 
  git clone https://github.com/vboss-tech/blockchain-identity &&
  cd blockchain-identity                                      &&
  nvm use v9.11.1 && yarn install
```

### Run
```
  nvm use v9.11.1 &&
  yarn clean      &&
  yarn start
```

### Tests
```
  yarn test 
```