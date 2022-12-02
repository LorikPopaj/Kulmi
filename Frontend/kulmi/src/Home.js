import React,{Component} from 'react';
import Header from './Header';
import Cookies from "universal-cookie";
 class Home extends Component{
    render(){
        return(
            <div>
                <Header />
                <h3>This is Home Page</h3>

            </div>

        )
    }
} 
export default Home;