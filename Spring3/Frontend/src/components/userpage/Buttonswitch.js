import React, {useState} from "react";
import "./Buttonswitch.css";
import {useNavigate} from "react-router-dom"


function ButtonSwitcher({email}){

    const path = "/userpage/" + email;
    const navigate = useNavigate()
    let buttonName = ['MyPage','MyFans','MyFollowing','MyBlog','MyAlbum']
    let buttonLink = [path,'/Fans','/Following','/Blogs','/Album']


    const[buttonState, changeState] = useState({
        activeObject: null ,
        object:[{id:1},{id:2},{id:3},{id:4},{id:5}]
    });


    function toggleActive(index){
        changeState ({ ...buttonState, activeObject: buttonState.object[index]});
        navigate(buttonLink[index])
    }

    function toggleActiveStyle(index){
        if(buttonState.object[index] === buttonState.activeObject){
            return "button active";
        }else{
            return "button inactive"
        }
    }
    return(
        <div className = 'Button'>
            {buttonState.object.map((elements, index)=>(
                <div
                    key={index}
                    className={toggleActiveStyle(index)}
                    onClick={()=> {
                        toggleActive(index);
                    }}
                >{buttonName[index]}</div>
            ))}
        </div>
    )
}

// const RightColumn = ({email}) => {
//     const navigate = useNavigate();
//
//     const path = "/userpage/" + email;
//
//
//     return (
//
//         <div className="right-column2">
//             <div className="right-column-content2">
//                 <div className='UserPage'>
//                     <button type='button' className='MyPage' onClick={()=>navigate(path)}>
//                         <p1>My Page</p1>
//                         <br/></button>
//                     <button type='button' className='MyFans' onClick={()=>navigate("/Fans")}>
//                         <p2>My Fans</p2>
//                         <br/></button>
//                     <button type='button' className='MyFollowing' onClick={()=>navigate("/Following")}>
//                         <p3>My Following</p3>
//                         <br/></button>
//                     <button type='button' className='MyBlog' onClick={()=>navigate("/Blogs")}>
//                         <p6>My Blog</p6>
//                         <br/></button>
//                     <button type='button' className='MyAlbum' onClick={()=>navigate("/Album")}>
//                         <p7>My Album</p7>
//                         <br/></button>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default ButtonSwitcher;