"use client"

import { useCallback, useEffect, useState } from "react";
import styles from './Daily.module.css'
import _ from 'lodash'
import { saveTodo, getTodo } from "@/util/firebase";

export default function Daily() {

    const [text, setText] = useState<string>('');

    async function getData() {
        const data = await getTodo();
        setText(data);
    }

    useEffect(() => {
        getData()
    }, [])
    
    const saveList = async (text: string) => {
        await saveTodo(text);
    }
    const handleDebounceVideo = useCallback(_.debounce(saveList, 1000), []);
    useEffect(() => {
        handleDebounceVideo(text as string);
    }, [text])

    return (
        <div className={styles.container}>
            <textarea 
                className={styles.ta} 
                value={text} 
                onChange={e=>setText(e.target.value)}></textarea>
        </div>
    )
}