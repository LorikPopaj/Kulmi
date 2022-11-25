import React,{Component} from "react";
import { variables } from "./Variables";

export class Bleresi extends Component{

    constructor(props){
        super(props);

        this.state={
            bleresit:[],
            modalTitle:"",
            BleresiId:0,
            BleresiName:"",
            BleresiNrTel:"",
            BleresiEmail:"",
            BleresiPassword:""
        }
    }

    refreshList(){
        fetch(variables.API_URL+'Bleresi')
        .then(response=>response.json())
        .then(data=>{
            this.setState({bleresit:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeBleresiName =(e)=>{
        this.setState({BleresiName:e.target.value});
    }
    changeBleresiNrTel =(e)=>{
        this.setState({BleresiNrTel:e.target.value});
    }
    changeBleresiEmail =(e)=>{
        this.setState({BleresiEmail:e.target.value});
    }
    changeBleresiPassword =(e)=>{
        this.setState({BleresiPassword:e.target.value});
    }

    


    addClick(){
        this.setState({
            modalTitle:"Add Bleresit",
            BleresiId:0,
            BleresiName:"",
            BleresiEmail:"",
            BleresiNrTel:"",
            BleresiPassword:""
        });
    }

    editClick(o){
        this.setState({
            modalTitle:"Edit Bleresit",
            BleresiId:o.BleresiId,
            BleresiName:o.BleresiName,
            BleresiNrTel:o.BleresiNrTel,
            BleresiEmail:o.BleresiEmail,
            BleresiPassword:o.BleresiPassword
        });
    }

    createClick(){
        fetch(variables.API_URL+'Bleresi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BleresiName:this.state.BleresiName,
                BleresiNrTel:this.state.BleresiNrTel,
                BleresiEmail:this.state.BleresiEmail,
                BleresiPassword:this.state.BleresiPassword
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'Bleresi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BleresiId:this.state.BleresiId,
                BleresiName:this.state.BleresiName,
                BleresiNrTel:this.state.BleresiNrTel,
                BleresiEmail:this.state.BleresiEmail,
                BleresiPassword:this.state.BleresiPassword
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Bleresi/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    

    render(){
        const {
            bleresit,
            modalTitle,
            BleresiId,
            BleresiName,
            BleresiEmail,
            BleresiNrTel,
            BleresiPassword

        }=this.state;
        return(
<div>

<button type="button" className="btn btn-primary m-2 float-end"
data-bs-toggle="modal" data-bs-target="#exampleModal"
onClick={()=>this.addClick()}>
    Add Bleresin
</button>
    <table className="table table-striped">
    <thead>
        <tr>
            <th>
            Id
            </th>
            <th>
            Name
            </th>
            <th>
            Nr tel
            </th>
            <th>
            Email
            </th>
            <th>
            Pw
            </th>
        </tr>
    </thead>
    <tbody>
        {bleresit.map(o=>
            <tr key={o.BleresiId}>
                <td>{o.BleresiId}</td>
                <td>{o.BleresiName}</td>
                <td>{o.BleresiEmail}</td>
                <td>{o.BleresiNrTel}</td>
                <td>{o.BleresiPassword}</td>
                <td>
                <button type="button" className="btn btn-light mr-1"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={()=>this.editClick(o)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <button type="button" className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(o.BleresiId)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                </button>
                
                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
<div className="modal-header">
    <h5 className="modal-title">{modalTitle}</h5>
    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>

<div className="modal-body">
<div className="d-flex flex-row bd-highlight mb-3">

    <div className="p-2 w-50 bd-highlight">
    <div className="input-group mb-3">
        <span className="input-group-text">BleresiName</span>
        <input type="text" className="form-control"
        value={BleresiName} onChange={this.changeBleresiName}/>
    </div>
    </div>
    <div className="p-2 w-50 bd-highlight">
    <div className="input-group mb-3">
        <span className="input-group-text">BleresiNrTel</span>
        <input type="text" className="form-control"
        value={BleresiNrTel} onChange={this.changeBleresiNrTel}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">BleresiEmail</span>
        <input type="text" className="form-control"
        value={BleresiEmail} onChange={this.changeBleresiEmail}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">BleresiPassword</span>
        <input type="text" className="form-control"
        value={BleresiPassword} onChange={this.changeBleresiPassword}/>
    </div>
    </div>
    </div>
    
    {BleresiId==0?
    <button type="button" className="btn btn-primary float-start"
    onClick={()=>this.createClick()}>
        Create
    </button>:null
    }

    {BleresiId!=0?
    <button type="button" className="btn btn-primary float-start"
    onClick={()=>this.updateClick()}>
        Update
    </button>:null
    }
</div>
</div>
</div>
</div>
</div>
        )
    }
}