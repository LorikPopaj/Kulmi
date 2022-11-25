import React,{Component} from "react";
import { variables } from "./Variables";

export class Kontaktet extends Component{

    constructor(props){
        super(props);

        this.state={
            kontakt:[],
            modalTitle:"",
            KontaktId:0,
            IkonaKontaktit:"sample.png",
            TitulliKontaktit:"",
            LinkuKontaktit:"",
            ImgPath:variables.PHOTO_URL
        }
    }

    refreshList(){
        fetch(variables.API_URL+'Kontaktet')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kontakt:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeIkonaKontaktit =(e)=>{
        this.setState({IkonaKontaktit:e.target.value});
    }
    changeTitulliKontaktit =(e)=>{
        this.setState({TitulliKontaktit:e.target.value});
    }

    changeLinkuKontaktit =(e)=>{
        this.setState({LinkuKontaktit:e.target.value});
    }
    

    addClick(){
        this.setState({
            modalTitle:"Add Kontakti",
            KontaktId:0,
            IkonaKontaktit:"sample.png",
            TitulliKontaktit:"",
            LinkuKontaktit:""
        });
    }

    editClick(o){
        this.setState({
            modalTitle:"Edit Kontakti",
            KontaktId:o.KontaktId,
            IkonaKontaktit:o.IkonaKontaktit,
            TitulliKontaktit:o.TitulliKontaktit,
            LinkuKontaktit:o.LinkuKontaktit
        });
    }

    createClick(){
        fetch(variables.API_URL+'Kontaktet',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                IkonaKontaktit:this.state.IkonaKontaktit,
                TitulliKontaktit:this.state.TitulliKontaktit,
                LinkuKontaktit:this.state.LinkuKontaktit
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
        fetch(variables.API_URL+'Kontaktet',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                KontaktId:this.state.KontaktId,
                IkonaKontaktit:this.state.IkonaKontaktit,
                TitulliKontaktit:this.state.TitulliKontaktit,
                LinkuKontaktit:this.state.LinkuKontaktit
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
        fetch(variables.API_URL+'Kontaktet/'+id,{
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

    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'Kontaktet/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({IkonaKontaktit:data});
        })
    }

    

    render(){
        const {
            kontakt,
            modalTitle,
            KontaktId,
            IkonaKontaktit,
            TitulliKontaktit,
            LinkuKontaktit,
            ImgPath
        }=this.state;
        return(
<div>

<button type="button" className="btn btn-primary m-2 float-end"
data-bs-toggle="modal" data-bs-target="#exampleModal"
onClick={()=>this.addClick()}>
    Add Kontakt
</button>
    <table className="table table-striped">
    <thead>
        <tr>
            <th>
            Id
            </th>
            <th>
            Icon
            </th>
            <th>
            Title
            </th> 
            <th>
            Linku
            </th> 
        </tr>
    </thead>
    <tbody>
        {kontakt.map(o=>
            <tr key={o.KontaktId}>
                <td>{o.KontaktId}</td>
                <td>{o.IkonaKontaktit}</td>
                <td>{o.TitulliKontaktit}</td>
                <td>{o.LinkuKontaktit}</td>
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
                onClick={()=>this.deleteClick(o.KontaktId)}>
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
        <span className="input-group-text">Titulli</span>
        <input type="text" className="form-control"
        value={TitulliKontaktit} onChange={this.changeTitulliKontaktit}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">Linku</span>
        <input type="text" className="form-control"
        value={LinkuKontaktit} onChange={this.changeLinkuKontaktit}/>
    </div>
    
    </div>
    <div className="p-2 w-50 bd-highlight">
        <img width="250px" height="250px" src={ImgPath+IkonaKontaktit}/>
        <input className="m-2" type="file" onChange={this.imageUpload}/> 
        
    </div>
    </div>
    
    {KontaktId==0?
    <button type="button" className="btn btn-primary float-start"
    onClick={()=>this.createClick()}>
        Create
    </button>:null
    }

    {KontaktId!=0?
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