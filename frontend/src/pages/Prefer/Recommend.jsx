import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Recommend = () => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const navigate = useNavigate();

    const handleTopicClick = (topic) => {
        setSelectedTopics((prevSelectedTopics) => {
            if (prevSelectedTopics.includes(topic)) {
                return prevSelectedTopics.filter((t) => t !== topic);
            } else {
                return [...prevSelectedTopics, topic];
            }
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/user/interests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ interests: selectedTopics })
            });
            const data = await response.json();
            console.log(data);
            if (data) {
                navigate('/');
            }
            // Handle success (e.g., show a message to the user)
        } catch (error) {
            console.error('Error submitting interests:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    const topics = [
        "Life",
        "Work",
        "Technology",
        "Media",
        "Society",
        "Culture",
        "World",
        "Self Improvement",
        "Marketing",
        "Art",
    ];

    return (
        <>
            <div className="wrap-content text-gray-500 bg-[#f7f8fa] ">
                <div className="container mx-auto py-2 px-4">
                    <div className="content flex text-xs ">
                        <Link className="hover:text-blue-600 mr-2" to={'/'}>Home </Link>
                        <p> / Select Your Topic in which you are Interested</p>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="container p-2 mx-auto">
                    <div className="heading my-4 mb-8 text-3xl font-semibold text-center p-2">
                        Please Select The Topics In Which You Are Interested
                    </div>
                    <div className="information flex justify-center py-2">
                        <div className="w-full mb-5 p-4 bg-[#e5e7eb] rounded-xl shadow sm:p-4 sm:py-6 dark:bg-gray-800 dark:border-gray-700">
                            <div className="heading flex justify-between">
                                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                                    All Categories
                                </h5>
                            </div>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Select one or more topics from the categories below.
                            </p>
                            <div className="mt-6 flex justify-between flex-wrap">
                                {topics.map((topic) => (
                                    <button
                                        key={topic}
                                        className={`px-4 py-3 rounded-xl mb-4 ${selectedTopics.includes(topic) ? 'bg-blue-200' : 'bg-white'} text-sm font-semibold`}
                                        onClick={() => handleTopicClick(topic)}
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="selected-topics my-4">
                        <h3 className="text-xl font-semibold mb-2">Selected Topics:</h3>
                        <div className="flex flex-wrap">
                            {selectedTopics.map((topic) => (
                                <div key={topic} className="px-4 py-2 m-2 bg-gray-200 rounded-xl">
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex py-5 mb-10 justify-center">
                        <button
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recommend;
