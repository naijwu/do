"use client"

import { useEffect, useState } from 'react';
import styles from './DB.module.css'
import OutsideAlerter from '@/util/useOutsideAlerter';
import { editItem, getItems, newItem } from '@/util/firebase';

export default function DB() {

    const [data, setData] = useState<any[]>();
    const [refresh, setRefresh] = useState<boolean>(false);

    async function getData() {
        const data = await getItems();
        console.log(data)
        setData(data);
    }

    useEffect(() => {
        getData()
    }, [refresh])

    const [hide, setHide] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<any | undefined>();

    function selectItem(item: any) {
        setSelected(item);
    }

    function handleNew() {
        setSelected({
            title: '',
            description: '',
            type: '',
            school_course: '',
            school_type: '',
            due: '',
            status: ''
        })
    }

    function handleEdit(key: string, value: string) {
        const current = JSON.parse(JSON.stringify(selected));
        current[key] = value;
        setSelected(current);
    }

    async function defocus() {
        if (selected.id) {
            // edit
            await editItem(selected.id, selected);
        } else {
            // new
            await newItem(selected);
        }
        setSelected(undefined);
        setRefresh(!refresh);
    }

    return (
        <div className={`${styles.container} ${!hide ? styles.expanded : ''}`}>
            {hide && (
                <div className={styles.peep} onClick={()=>setHide(!hide)}>(db)</div>
            )}
            {!hide && (
                <div className={styles.interactive}>
                    {/* Tasks */}
                    <div className={styles.dbWrapper}>
                        <div className={styles.text} onClick={()=>setHide(!hide)}>(db)</div>
                        <table className={styles.table}>
                            <tr>
                                <th>title</th>
                                <th>type</th>
                                <th>course</th>
                                <th>assignment</th>
                                <th>due</th>
                                <th>status</th>
                            </tr>
                            {data?.map((item, index) => (
                                <tr key={index}>
                                    <td onClick={()=>selectItem(item)}>{item.title}</td>
                                    <td>{item.type}</td>
                                    <td>{item.school_course}</td>
                                    <td>{item.school_type}</td>
                                    <td>{item.due}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </table>
                        <div className={styles.new} onClick={handleNew}>
                            + new
                        </div>
                    </div>

                    {/* Info column */}
                    <OutsideAlerter onClickOutside={defocus}>
                        <div className={`${styles.panel} ${!!selected && styles.opened}`}>
                            <div className={styles.panelText}>{selected?.id ? `(${selected?.title})` : `(new)`}</div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '0.8rem',
                                gap: '0.25rem'
                            }}>
                                {selected && Object.keys(selected).map((k, i) => k !== 'id' &&(
                                    <div key={i} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                            minWidth: 150
                                        }}>{k}</div>
                                        <input className={styles.input} type="text" value={selected[k]} onChange={e=>handleEdit(k, e.currentTarget.value)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </OutsideAlerter>
                </div>
            )}
        </div>
    )
}