pragma solidity ^0.8.0;


contract ArticleContract{

    uint256 public constant max_validations_per_run = 5;
    uint256 public constant max_active_validators = 5;
    uint256 public constant k = max_active_validators/2;
    uint256 public constant x = 5;
    uint256 public constant min_validated_articles_to_be_eligible = 4;

    uint256 public constant author_reward_upon_article_validation = 1;
    uint256 public constant validator_reward_upon_article_min_upvotes = 1;
    
    uint256 public num_active_validators = 0;
    uint256 public total_rewards = 0;
    
    // struct for user data
    struct User {
        string username;
        address wallet_addr;

        bool is_exists;
        bool is_eligible_validator;
        bool is_validator;

        uint256 num_articles_validated_current_run;
        uint256 rewards;

        uint256 num_validated_articles;
    }

    // struct for article data
    struct Article {
        uint aid;
        string author;
        string title;
        string content;
        address author_wallet_addr;

        address[] upvoters;
        address[] downvoters;
        address[] validators;
        
        bool is_validated;
        bool is_upvotes_rewarded;
        uint last_modified_time;
    }

    // arrays for storing users and articles
    User[] public users;
    Article[] public articles;

    // mappings for ids to addresses
    mapping(address => uint256) wallet_address_to_user_id;
    mapping(uint256 => address) user_id_to_wallet_address;
    mapping(uint256 => address) article_id_to_wallet_address;


    // events 
    event UserCreated(uint256 uid);
    event ArticleSubmitted(uint256 aid);
    event ArticleUpdated(uint256 aid);
    event RewardSummary(address rec_addr, uint256 rec_rewards, uint256 total_rewards);
    event UserBecomesValidator(address author_addr);
    event UserEligibleForValidator(address author_addr);
    event ArticleUpvoted(uint256 aid, address voter);
    event ArticleDownvoted(uint256 aid, address voter);
    event ValidatorTransferred(address from_, address to_);
    event ArticleValidated(uint256 aid, address validator);
    event ArticlePublished(uint256 aid);


    // constructor
    constructor() {

    }

    // list of functions implemented

    // function createNewUser(string memory uname_, address wallet_addr_) public;
    // function getNumUsers() external view returns (uint);
    // function getUser(uint uid) external view returns (User memory);
    // function validateLength(string memory inp, uint256 max_words) internal pure returns (bool);
    // function submitArticle(string memory title_, string memory content_) external;
    // function updateArticle(uint aid, string memory title_, string memory content_) external;
    // function rewardValidators(uint aid) internal;
    // function rewardAuthor(uint aid) internal;
    // function upvoteArticle(uint aid) external;
    // function downvoteArticle(uint aid) external;
    // function getArticleById(uint aid) external view returns (Article memory);
    // function getAllSubmittedArticles() external view returns (Article[] memory);
    // function getAllPublishedArticles() external view returns (Article[] memory);
    // function getAllArticles() external view returns (Article[] memory);
    // function getNumTotalArticles() external view returns (uint);
    // function getNumUpvotes(uint aid) external view returns (uint);
    // function getNumDownvotes(uint aid) external view returns (uint);
    // function getAllUsers() external view returns (User[] memory);
    // function changeValidator() private;
    // function checkMaxValidations() private;
    // function validateArticle(uint aid) external;

    
    // functions related to user

    // create a new user
    function createNewUser(string memory uname_, address wallet_addr_) public {
        bool is_eligible_validator = false;
        if ( num_active_validators < max_active_validators ) {
            is_eligible_validator = true;
            num_active_validators += 1;
        }
        users.push(User(uname_, wallet_addr_, true, is_eligible_validator, is_eligible_validator, 0, 0, 0));
        wallet_address_to_user_id[wallet_addr_] = users.length - 1;
        user_id_to_wallet_address[users.length - 1] = wallet_addr_;
        emit UserCreated(users.length - 1);
    }

    // get number of users
    function getNumUsers() external view returns (uint) {
        return users.length;
    }

    // fetch a user object
    function getUser(uint uid) external view returns (User memory) {
        require(users[uid].is_exists == true, "user doesn't exist");
        return users[uid];
    }
    // functions related to articles

    // check the length of input string to be atmost max_words
    function validateLength(string memory inp, uint256 max_words) internal pure returns (bool){
        bytes memory bytes_input = bytes(inp);
        uint wc = 0;
        bool last_char_was_space = true;
        
        for (uint i = 0; i < bytes_input.length; i++) {
            if (bytes_input[i] == ' ')
                last_char_was_space = true;
            else if (last_char_was_space == true) {
                wc++;
                if (wc > max_words) return false;   
                last_char_was_space = false;
            }
        }
        return true;
    }

    // add a new article to the blockchain
    function submitArticle(string memory title_, string memory content_) external {
        require(users[wallet_address_to_user_id[msg.sender]].is_exists == true, "user doesn't exist");

        uint aid = articles.length;
        string memory author = users[wallet_address_to_user_id[msg.sender]].username;
        articles.push(Article(aid, author, title_, content_, msg.sender, 
                            new address[](0), new address[](0), new address[](0),
                            false, false, block.timestamp));
        article_id_to_wallet_address[aid] = msg.sender;
        emit ArticleSubmitted(aid);
    }

    function updateArticle(uint aid, string memory title_, string memory content_) external {
        require(users[wallet_address_to_user_id[msg.sender]].is_exists == true, "user doesn't exist");
        require(article_id_to_wallet_address[aid] == msg.sender, "you cannot update someone else's article");

        articles[aid].title = title_;
        articles[aid].content = content_;
        articles[aid].last_modified_time = block.timestamp;
        emit ArticleUpdated(aid);
    }
    // rewards functions for validators and authors
    // give rewards to all validators for a particular article
    function rewardValidators(uint aid) internal {
        for(uint i = 0; i < articles[aid].validators.length; i++) {
            address validator_addr = articles[aid].validators[i];
            uint256 validator_uid = wallet_address_to_user_id[validator_addr];

            users[validator_uid].rewards += 1;
            total_rewards += 1;
            emit RewardSummary(validator_addr, users[validator_uid].rewards, total_rewards);
        }
    }

    // give rewards to author for a particular article 
    function rewardAuthor(uint aid) internal {
        address author_addr = articles[aid].author_wallet_addr;
        uint256 author_uid = wallet_address_to_user_id[author_addr];

        users[author_uid].rewards += 1;
        total_rewards += 1;
        emit RewardSummary(author_addr, users[author_uid].rewards, total_rewards);

        // check the condition to make user eligible for becoming a validator;
        if (users[author_uid].rewards >= total_rewards*3/20) {
            if (users[author_uid].is_eligible_validator == false)
                users[author_uid].is_eligible_validator = true;
            if (users[author_uid].is_validator == false && num_active_validators < max_active_validators) {
                users[author_uid].is_validator = true;
                num_active_validators += 1;
                emit UserBecomesValidator(author_addr);
            }
            emit UserEligibleForValidator(author_addr);
        }
    }

    // upvoting an article
    function upvoteArticle(uint aid) external {
        require(users[wallet_address_to_user_id[msg.sender]].is_exists == true, "user doesn't exist");
        // require(articles[aid].is_validated == true, "article is not validated yet");
        // require(articles[aid].author_wallet_addr != msg.sender, "you can't upvote your own article");
        
        // check if current user has already upvoted this article
        for(uint i=0; i<articles[aid].upvoters.length; i++) {
            if (articles[aid].upvoters[i] == msg.sender) {
                return;
            }
        }
        // check if current user has downvoted this article, and delete it from list
        for(uint i=0; i<articles[aid].downvoters.length; i++) {
            if (articles[aid].downvoters[i] == msg.sender) {
                delete articles[aid].downvoters[i];
                return;
            }
        }

        articles[aid].upvoters.push(msg.sender);
        emit ArticleUpvoted(aid, msg.sender);


        if (articles[aid].is_upvotes_rewarded == false && articles[aid].upvoters.length == x) {
            articles[aid].is_upvotes_rewarded = true;
            rewardValidators(aid);
        }
    }

    // downvoting an article
    function downvoteArticle(uint aid) external {
        require(users[wallet_address_to_user_id[msg.sender]].is_exists == true, "user doesn't exist");
        // require(articles[aid].is_validated == true, "article is not validated yet");
        // require(articles[aid].author_wallet_addr != msg.sender, "you can't validate your own article");

        // check if current user has already downvoted this article
        for(uint i=0; i<articles[aid].downvoters.length; i++) {
            if (articles[aid].downvoters[i] == msg.sender) {
                return;
            }
        }
        // check if current user has upvoted this article, and delete it from list
        for(uint i=0; i<articles[aid].upvoters.length; i++) {
            if (articles[aid].upvoters[i] == msg.sender) {
                delete articles[aid].upvoters[i];
                return;
            }
        }

        articles[aid].downvoters.push(msg.sender);
        emit ArticleDownvoted(aid, msg.sender);
    }

    // get article object from memory, to be dealt by the frontend
    function getArticleById(uint aid) external view returns (Article memory) {
        return articles[aid];
    }

    // 
    function getAllSubmittedArticles() external view returns (Article[] memory) {
        require(users[wallet_address_to_user_id[msg.sender]].is_validator == true, "user is not a validator currently");

        Article[] memory tempSubmittedArticles = new Article[](articles.length);
        uint counter = 0;
        for(uint aid=0; aid<articles.length; aid++) {
            if (articles[aid].is_validated == false) {
                tempSubmittedArticles[counter] = articles[aid];
                counter++;
            }
        }
        assembly{mstore(tempSubmittedArticles, counter)}
        return tempSubmittedArticles;
    }

    function getAllPublishedArticles() external view returns (Article[] memory) {
        Article[] memory tempPublishedArticles = new Article[](articles.length);
        uint counter = 0;
        for(uint aid=0; aid<articles.length; aid++) {
            if (articles[aid].is_validated == true) {
                tempPublishedArticles[counter] = articles[aid];
                counter++;
            }
        }
        assembly{mstore(tempPublishedArticles, counter)}
        return tempPublishedArticles;
    }

    function getMySubmittedArticles() external view returns (Article[] memory) {
        require(users[wallet_address_to_user_id[msg.sender]].is_validator == true, "user is not a validator currently");

        Article[] memory mySubmittedArticles = new Article[](articles.length);
        uint counter = 0;
        for(uint aid=0; aid<articles.length; aid++) {
            if (articles[aid].is_validated == false && article_id_to_wallet_address[aid] == msg.sender) {
                mySubmittedArticles[counter] = articles[aid];
                counter++;
            }
        }
        assembly{mstore(mySubmittedArticles, counter)}
        return mySubmittedArticles;
    }

    function getMyPublishedArticles() external view returns (Article[] memory) {
        Article[] memory myPublishedArticles = new Article[](articles.length);
        uint counter = 0;
        for(uint aid=0; aid<articles.length; aid++) {
            if (articles[aid].is_validated == true && article_id_to_wallet_address[aid] == msg.sender) {
                myPublishedArticles[counter] = articles[aid];
                counter++;
            }
        }
        assembly{mstore(myPublishedArticles, counter)}
        return myPublishedArticles;
    }

    //
    function getAllArticles() external view returns (Article[] memory) {
        return articles;
    }

    
    //
    function getNumTotalArticles() external view returns (uint) {
        return articles.length;
    }



    //
    function getNumUpvotes(uint aid) external view returns (uint) {
        return articles[aid].upvoters.length;
    }

    //
    function getNumDownvotes(uint aid) external view returns (uint) {
        return articles[aid].downvoters.length;
    }

    //
    function getAllUsers() external view returns (User[] memory) {
        return users;
    }

    //
    function changeValidator() private {
        require(users[wallet_address_to_user_id[msg.sender]].is_validator == true, "user is not a validator currently");
        uint256 curr_uid = wallet_address_to_user_id[msg.sender];

        for(uint uid=0; uid<users.length; uid++) {
            if (uid != curr_uid && users[uid].is_eligible_validator == true && users[uid].is_validator == false) {
                users[uid].is_validator = true;
                users[uid].num_articles_validated_current_run = 0;

                users[curr_uid].is_validator = false;
                users[curr_uid].num_articles_validated_current_run = 0;

                emit ValidatorTransferred(msg.sender, user_id_to_wallet_address[uid]);
                break;
            }
        }
    }


    function validateArticle(uint aid) external {
        require(users[wallet_address_to_user_id[msg.sender]].is_exists == true, "user doesn't exist");
        require(users[wallet_address_to_user_id[msg.sender]].is_validator == true, "user is not a validator currently");
        // require(articles[aid].author_wallet_addr != msg.sender, "you can't validate your own article");
        require(articles[aid].is_validated == false, "article is already validated");
        
        for(uint i=0; i<articles[aid].validators.length; i++){
            if (articles[aid].validators[i] == msg.sender)
                return;
        }

        articles[aid].validators.push(msg.sender);
        emit ArticleValidated(aid, msg.sender);

        if (articles[aid].is_validated == false && articles[aid].validators.length >= k) {
            articles[aid].is_validated == true;
            emit  ArticlePublished(aid);



            address author_addr = articles[aid].author_wallet_addr;
            uint256 author_uid = wallet_address_to_user_id[author_addr];
            users[author_uid].num_validated_articles += 1;

            if (users[author_uid].is_eligible_validator == false && users[author_uid].num_validated_articles >= min_validated_articles_to_be_eligible) {
                users[author_uid].is_eligible_validator = true;
                if (num_active_validators <= max_active_validators) {
                    num_active_validators += 1;
                    emit UserBecomesValidator(author_addr);
                }
                emit UserEligibleForValidator(author_addr);
            }
        }

        if (num_active_validators >= max_active_validators && users[wallet_address_to_user_id[msg.sender]].num_articles_validated_current_run >= max_validations_per_run)
            changeValidator();

    }





    

}