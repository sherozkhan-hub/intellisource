import React from 'react'
import Head from '../../components/Sidebar/Head'
import Sidebar from '../../components/Sidebar/Sidebar'
import PostTable from '../../components/Sidebar/PostTable'

const AllPost = () => {
    return (
        <>
            <div className="dashboard">
                <div className="container mx-auto border-2 border-black p-2">
                    <Head />
                    <div className="admin-panal flex border-2 border-black p-2 ">
                        <Sidebar />
                        <PostTable />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllPost