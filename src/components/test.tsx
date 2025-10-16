import { File } from "buffer"

export default function test(){
    const handleUploadImage = () =>{
        const res = fetch(`http://localhost:2100/upload`,{
            method:'POST',
            headers:{'Content-Type':'file'},
            file:{
                filename:
            }
        })
    }
    return(
        <div>

        </div>
    )
}