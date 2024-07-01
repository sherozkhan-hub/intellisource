import React from 'react'
import Head from '../../components/Sidebar/Head'
import Sidebar from '../../components/Sidebar/Sidebar'
import CommentTable from '../../components/Comments/CommentTable'

const Comments = () => {
    return (
        <>
            <div className="dashboard">
                <div className="container mx-auto border-2 border-black p-2">
                    <Head />
                    <div className="admin-panal flex border-2 border-black p-2 ">
                        <Sidebar />
                        <CommentTable />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments