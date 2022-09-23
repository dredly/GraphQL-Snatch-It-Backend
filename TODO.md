## Short Term

- [x] Change data structure of game so that there are separate arrays of flipped and unflipped letters
- [x] Implement resolver for player writing a word
- [x] Refactor mutationResolvers file
- [x] Actually finish writeWord resolver, working with frontend
- [x] Add subscription for writeWord
- [x] Refactor subscriptions
- [x] Add mutations for snatching
    - [x] Test snatchLetters function
    - [x] Create snatchWord resolver
    - [x] Make sure resolver searches for words from all players in the game
    - [x] Sort out subscriptions and get working with frontend
    - [x] Refactor mutationResolvers file
- [ ] Migrate over to using gqlobby-server
    - [x] Convert actions
    - [x] Write tests for edge cases of actions
    - [x] Make sure helpers still work
        - [x] Write tests for letter helpers
            - [x] getLettersForWord
            - [x] handleLetterFlip
            - [x] snatchLetters
        - [x] Integrate letter flipping back into actions
            - [x] Add back into declareReadiness action
            - [x] Extend tests for declareReadiness action accordingly
    - [ ] Sort out resolvers
        - [ ] Get them working with actions
        - [ ] Add pubsub stuff back
        - [ ] Add startNewGame action and resolver
    - [ ] Get server startable again
- [ ] Add end condition

## Long Term

- [ ] Use Redis cache for state?