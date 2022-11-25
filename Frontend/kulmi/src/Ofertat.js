import React,{Component} from "react";
import { variables } from "./Variables";

export class Ofertat extends Component{

    constructor(props){
        super(props);

        this.state={
            oferta:[],
            modalTitle:"",
            ObjektiId:0,
            ObjektiFoto:"sample.png",
            ObjektiLagjja:"",
            ObjektiQyteti:"",
            ObjektiLloji:"",
            ObjektiStatusi:"",
            ObjektiShitesi:"",
            ObjektiNrIDhomave:"",
            ObjektiBanjo:"",
            ObjektiSize:"",
            Zbritja:"",
            ImgPath:variables.PHOTO_URL
        }
    }

    refreshList(){
        fetch(variables.API_URL+'Ofertat')
        .then(response=>response.json())
        .then(data=>{
            this.setState({oferta:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeObjektiFoto =(e)=>{
        this.setState({ObjektiFoto:e.target.value});
    }
    
    changeObjektiQyteti =(e)=>{
        this.setState({ObjektiQyteti:e.target.value});
    }

    changeObjektiLloji =(e)=>{
        this.setState({ObjektiLloji:e.target.value});
    }

    changeObjektiStatusi =(e)=>{
        this.setState({ObjektiStatusi:e.target.value});
    }

    changeObjektiShitesi =(e)=>{
        this.setState({ObjektiShitesi:e.target.value});
    }

    changeObjektiNrIDhomave =(e)=>{
        this.setState({ObjektiNrIDhomave:e.target.value});
    }

    changeObjektiBanjo =(e)=>{
        this.setState({ObjektiBanjo:e.target.value});
    }

    changeObjektiSize =(e)=>{
        this.setState({ObjektiSize:e.target.value});
    }
    changeObjektiLagjja=(e)=>{
        this.setState({ObjektiLagjja:e.target.value});
    }
    changeZbritja=(e)=>{
        this.setState({Zbritja:e.target.value});
    }
    


    addClick(){
        this.setState({
            modalTitle:"Add Ofertat",
            ObjektiId:0,
            ObjektiFoto:"sample.png",
            ObjektiLagjja:"",
            ObjektiQyteti:"",
            ObjektiLloji:"",
            ObjektiStatusi:"",
            ObjektiShitesi:"",
            ObjektiNrIDhomave:"",
            ObjektiBanjo:"",
            ObjektiSize:"",
            Zbritja:""
        });
    }

    editClick(o){
        this.setState({
            modalTitle:"Edit Ofertat",
            ObjektiId:o.ObjektiId,
            ObjektiFoto:o.ObjektiFoto,
            ObjektiLagjja:o.ObjektiLagjja,
            ObjektiQyteti:o.ObjektiQyteti,
            ObjektiLloji:o.ObjektiLloji,
            ObjektiStatusi:o.ObjektiStatusi,
            ObjektiShitesi:o.ObjektiShitesi,
            ObjektiNrIDhomave:o.ObjektiNrIDhomave,
            ObjektiBanjo:o.ObjektiBanjo,
            ObjektiSize:o.ObjektiSize,
            Zbritja:o.Zbritja
        });
    }

    createClick(){
        fetch(variables.API_URL+'Ofertat',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ObjektiFoto:this.state.ObjektiFoto,
                ObjektiLagjja:this.state.ObjektiLagjja,
                ObjektiQyteti:this.state.ObjektiQyteti,
                ObjektiLloji:this.state.ObjektiLloji,
                ObjektiStatusi:this.state.ObjektiStatusi,
                ObjektiShitesi:this.state.ObjektiShitesi,
                ObjektiNrIDhomave:this.state.ObjektiNrIDhomave,
                ObjektiBanjo:this.state.ObjektiBanjo,
                ObjektiSize:this.state.ObjektiSize, 
                Zbritja:this.state.Zbritja  
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
        fetch(variables.API_URL+'Ofertat',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ObjektiId:this.state.ObjektiId,
                ObjektiFoto:this.state.ObjektiFoto,
                ObjektiLagjja:this.state.ObjektiLagjja,
                ObjektiQyteti:this.state.ObjektiQyteti,
                ObjektiLloji:this.state.ObjektiLloji,
                ObjektiStatusi:this.state.ObjektiStatusi,
                ObjektiShitesi:this.state.ObjektiShitesi,
                ObjektiNrIDhomave:this.state.ObjektiNrIDhomave,
                ObjektiBanjo:this.state.ObjektiBanjo,
                ObjektiSize:this.state.ObjektiSize,
                Zbritja:this.state.Zbritja
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
        fetch(variables.API_URL+'Ofertat/'+id,{
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

        fetch(variables.API_URL+'Ofertat/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({ObjektiFoto:data});
        })
    }

    

    render(){
        const {
            oferta,
            modalTitle,
            ObjektiId,
            ObjektiFoto,
            ObjektiLagjja,
            ObjektiQyteti,
            ObjektiLloji,
            ObjektiStatusi,
            ObjektiShitesi,
            ObjektiNrIDhomave,
            ObjektiBanjo,
            ObjektiSize,
            Zbritja,
            ImgPath
        }=this.state;
        return(
<div>

<button type="button" className="btn btn-primary m-2 float-end"
data-bs-toggle="modal" data-bs-target="#exampleModal"
onClick={()=>this.addClick()}>
    Add Ofertat
</button>
    <table className="table table-striped">
    <thead>
        <tr>
            <th>
            Id
            </th>
            <th>
            Foto
            </th>
            <th>
            Lagjja
            </th>
            <th>
            Qyteti
            </th>
            <th>
            Lloji
            </th>
            <th>
            Statusi
            </th>
            <th>
            Shitesi
            </th>
            <th>
            NrIDhomave
            </th>
            <th>
            Banjo
            </th>
            <th>
            Size
            </th>
            <th>
            Zbritja
            </th>
        </tr>
    </thead>
    <tbody>
        {oferta.map(o=>
            <tr key={o.ObjektiId}>
                <td>{o.ObjektiId}</td>
                <td>{o.ObjektiFoto}</td>
                <td>{o.ObjektiLagjja}</td>
                <td>{o.ObjektiQyteti}</td>
                <td>{o.ObjektiLloji}</td>
                <td>{o.ObjektiStatusi}</td>
                <td>{o.ObjektiShitesi}</td>
                <td>{o.ObjektiNrIDhomave}</td>
                <td>{o.ObjektiBanjo}</td>
                <td>{o.ObjektiSize}</td>
                <td>{o.Zbritja}</td>
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
                onClick={()=>this.deleteClick(o.ObjektiId)}>
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
        <span className="input-group-text">ObjektiLagjja</span>
        <input type="text" className="form-control"
        value={ObjektiLagjja} onChange={this.changeObjektiLagjja}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">ObjektiQyteti</span>
        <input type="text" className="form-control"
        value={ObjektiQyteti} onChange={this.changeObjektiQyteti}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">ObjektiLloji</span>
        <input type="text" className="form-control"
        value={ObjektiLloji} onChange={this.changeObjektiLloji}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">ObjektiStatusi</span>
        <input type="text" className="form-control"
        value={ObjektiStatusi} onChange={this.changeObjektiStatusi}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">ObjektiShitesi</span>
        <input type="text" className="form-control"
        value={ObjektiShitesi} onChange={this.changeObjektiShitesi}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">ObjektiNrIDhomave</span>
        <input type="text" className="form-control"
        value={ObjektiNrIDhomave} onChange={this.changeObjektiNrIDhomave}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">ObjektiBanjo</span>
        <input type="text" className="form-control"
        value={ObjektiBanjo} onChange={this.changeObjektiBanjo}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">ObjektiSize</span>
        <input type="text" className="form-control"
        value={ObjektiSize} onChange={this.changeObjektiSize}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">Zbritja</span>
        <input type="text" className="form-control"
        value={Zbritja} onChange={this.changeZbritja}/>
    </div>
    </div>
    <div className="p-2 w-50 bd-highlight">
        <img width="250px" height="250px" src={ImgPath+ObjektiFoto}/>
        <input className="m-2" type="file" onChange={this.imageUpload}/> 
        
    </div>
    </div>
    
    {ObjektiId==0?
    <button type="button" className="btn btn-primary float-start"
    onClick={()=>this.createClick()}>
        Create
    </button>:null
    }

    {ObjektiId!=0?
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