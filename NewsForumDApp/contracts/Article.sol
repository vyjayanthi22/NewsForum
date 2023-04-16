pragma solidity ^0.8.0;


contract ArticleContract{


    struct User {
        uint id;
        string photo;
        address addr;
        bool is_anon;
        bool eligible_validator;
        bool is_validator;
    }

    struct Article {
        uint id;
        string title;
        string content;
        string author;
        uint upvotes;
        uint downvotes;
        bool isvalidated;
        address[] validators;
    }

    event AddArticle(address recipient, uint articleId);
    event UpVote(uint articleId);
    event DownVote(uint articleId);


    mapping(uint => Article) public articles;
    mapping(uint => mapping(address => bool)) hasUpvoted;
    mapping(uint => address) articleToUser;


    uint public num_articles = 0;



    // Method to be called by our frontend when trying to submit a new article
    function submitArticle(string memory _title,  string memory _content) external{
        require(bytes(_content).length > 0, 'Content must be valid!');

        num_articles++;
        string memory _author = "Anonymous";
        articles[num_articles] = Article(num_articles, _title, _content, "", 0, 0, false, new address[](0));
    
        articleToUser[num_articles] = msg.sender;
        emit AddArticle(msg.sender, num_articles);
    }


    function validateArticle(uint _aid) public {
        require(_aid > 0 && _aid <= num_articles, 'Id must be valid!');
        require(msg.sender != articleToUser[_aid], 'Author cannot validate his own article!');

        articles[_aid].validators.push(msg.sender); // add to list of validaors for this article

        uint num_validators = articles[_aid].validators.length;
        if (num_validators > 3) articles[_aid].isvalidated = true;

        // submitted_articles_count--;
        // validated_articles_count++;
    }

    function getValidatedArticles() external view returns (Article[] memory) {
        Article[] memory temp = new Article[](num_articles);
        uint counter = 0;
        for(uint id=1; id<=num_articles; id++) {
            if (articles[id].isvalidated == true) {
                temp[counter] = articles[id];
                counter++;
            }
        }

        Article[] memory res = new Article[](counter);
        for(uint id=1; id<=counter; id++)    res[id] = temp[id];

        return res;
    }

    function getMySubmittedArticles() external view returns (Article[] memory) {
        Article[] memory temp = new Article[](num_articles);
        uint counter = 0;
        for(uint id=1; id<=num_articles; id++) {
            if (articleToUser[id] == msg.sender && articles[id].isvalidated == false) {
                temp[counter] = articles[id];
                counter++;
            }
        }

        Article[] memory res = new Article[](counter);
        for(uint id=1; id<=counter; id++)    res[id] = temp[id];

        return res;
    }

    function getMyValidatedArticles() external view returns (Article[] memory) {
        Article[] memory temp = new Article[](num_articles);
        uint counter = 0;
        for(uint id=1; id<=num_articles; id++) {
            if (articleToUser[id] == msg.sender && articles[id].isvalidated == true) {
                temp[counter] = articles[id];
                counter++;
            }
        }

        Article[] memory res = new Article[](counter);
        for(uint id=1; id<=counter; id++)    res[id] = temp[id];

        return res;
    }

    function upVote(uint _aid) external {
        require(hasUpvoted[_aid][msg.sender] == false, "This user has already upvoted for this article!");

        uint num_upvotes = articles[_aid].upvotes;
        articles[_aid].upvotes = num_upvotes+1;
        hasUpvoted[_aid][msg.sender] = true;

        emit UpVote(_aid);
    }

   
    

}