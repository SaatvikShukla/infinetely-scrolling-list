import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useMessageFetch () {
    const limit = 10;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [messages, setMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [count, setCount] = useState(0);
    
    const [pageToken, setpageToken] = useState("");
    const [interimPageToken, setinterimPageToken] = useState("");

    function refetch () {
        setpageToken(interimPageToken);
    }
    function deleteMessageAtId (id) {
        setLoading(true);
        const arr = messages.filter(item => ((item.id) !== parseInt(id) - 1));
        setMessages(arr)
        setCount(arr.length)
        setLoading(false);
    }

    useEffect(() => {
        console.log('fetching more');
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: "https://message-list.appspot.com/messages",
            params: {limit: limit, pageToken: pageToken}
        }).then((resp) => {
            // console.log('resp', resp.data);
            setMessages([...messages, ...resp.data.messages]);
            setHasMore(resp.data.messages.length > 0);
            setCount(count + resp.data.count);
            setinterimPageToken(resp.data.pageToken);
            setLoading(false);
        }).catch((e) => {
            console.log("e", e);
            setError(true);
        });
    }, [pageToken]);

    return { loading, error, messages, refetch, deleteMessageAtId };
}