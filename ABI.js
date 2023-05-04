const ABI=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "ArticleDownvoted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			}
		],
		"name": "ArticlePublished",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			}
		],
		"name": "ArticleSubmitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			}
		],
		"name": "ArticleUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "ArticleUpvoted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "validator",
				"type": "address"
			}
		],
		"name": "ArticleValidated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "uname_",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "wallet_addr_",
				"type": "address"
			}
		],
		"name": "createNewUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			}
		],
		"name": "downvoteArticle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "rec_addr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rec_rewards",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "total_rewards",
				"type": "uint256"
			}
		],
		"name": "RewardSummary",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content_",
				"type": "string"
			}
		],
		"name": "submitArticle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content_",
				"type": "string"
			}
		],
		"name": "updateArticle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			}
		],
		"name": "upvoteArticle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "author_addr",
				"type": "address"
			}
		],
		"name": "UserBecomesValidator",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			}
		],
		"name": "UserCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "author_addr",
				"type": "address"
			}
		],
		"name": "UserEligibleForValidator",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			}
		],
		"name": "validateArticle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "from_",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to_",
				"type": "address"
			}
		],
		"name": "ValidatorTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "articles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "author_wallet_addr",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "is_validated",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "is_upvotes_rewarded",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "last_modified_time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "author_reward_upon_article_validation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllArticles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "aid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "author_wallet_addr",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "upvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "downvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "validators",
						"type": "address[]"
					},
					{
						"internalType": "bool",
						"name": "is_validated",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_upvotes_rewarded",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "last_modified_time",
						"type": "uint256"
					}
				],
				"internalType": "struct ArticleContract.Article[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPublishedArticles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "aid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "author_wallet_addr",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "upvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "downvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "validators",
						"type": "address[]"
					},
					{
						"internalType": "bool",
						"name": "is_validated",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_upvotes_rewarded",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "last_modified_time",
						"type": "uint256"
					}
				],
				"internalType": "struct ArticleContract.Article[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSubmittedArticles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "aid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "author_wallet_addr",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "upvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "downvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "validators",
						"type": "address[]"
					},
					{
						"internalType": "bool",
						"name": "is_validated",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_upvotes_rewarded",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "last_modified_time",
						"type": "uint256"
					}
				],
				"internalType": "struct ArticleContract.Article[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "wallet_addr",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "is_exists",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_eligible_validator",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_validator",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "num_articles_validated_current_run",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewards",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "num_validated_articles",
						"type": "uint256"
					}
				],
				"internalType": "struct ArticleContract.User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			}
		],
		"name": "getArticleById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "aid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "author_wallet_addr",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "upvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "downvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "validators",
						"type": "address[]"
					},
					{
						"internalType": "bool",
						"name": "is_validated",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_upvotes_rewarded",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "last_modified_time",
						"type": "uint256"
					}
				],
				"internalType": "struct ArticleContract.Article",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyPublishedArticles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "aid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "author_wallet_addr",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "upvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "downvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "validators",
						"type": "address[]"
					},
					{
						"internalType": "bool",
						"name": "is_validated",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_upvotes_rewarded",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "last_modified_time",
						"type": "uint256"
					}
				],
				"internalType": "struct ArticleContract.Article[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMySubmittedArticles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "aid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "author_wallet_addr",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "upvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "downvoters",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "validators",
						"type": "address[]"
					},
					{
						"internalType": "bool",
						"name": "is_validated",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_upvotes_rewarded",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "last_modified_time",
						"type": "uint256"
					}
				],
				"internalType": "struct ArticleContract.Article[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			}
		],
		"name": "getNumDownvotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumTotalArticles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "aid",
				"type": "uint256"
			}
		],
		"name": "getNumUpvotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumUsers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "wallet_addr",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "is_exists",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_eligible_validator",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "is_validator",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "num_articles_validated_current_run",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewards",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "num_validated_articles",
						"type": "uint256"
					}
				],
				"internalType": "struct ArticleContract.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "k",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "max_active_validators",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "max_validations_per_run",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "min_validated_articles_to_be_eligible",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "num_active_validators",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_rewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "wallet_addr",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "is_exists",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "is_eligible_validator",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "is_validator",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "num_articles_validated_current_run",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rewards",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num_validated_articles",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "validator_reward_upon_article_min_upvotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "x",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

module.exports = {ABI};