import { React, useEffect } from 'react'
import {
    home
} from '../data'
import '../style/Content.css'

const Content = ({ filename }) => {
    useEffect(() => {
        const files = {
            home: home
        }
        const MyComponent = files[filename]
        // console.log(files[filename])
    }, [])
    return (
        <main id="Content">
            
        </main>
    )
}

export default Content