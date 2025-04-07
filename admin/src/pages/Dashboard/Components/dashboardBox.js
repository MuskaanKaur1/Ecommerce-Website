import { Button } from "@mui/material";



const DashboardBox=(props)=>{

    return(
        <>
        <div className="dashboardBox" style={{backgroundImage:`linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`}}>

           

        <div className="d-flex w-100">
            <div className="col1">
                <h5 className="text-white">Total Users</h5>
                <span className="text-white">277</span>
            </div>

            <div className="ml-auto">
                {
                    props.icon ? 
                        <span className="icon">
                           {props.icon ? props.icon : ''}
                        </span>

                    :
                    ''
                }
                
            </div>
        </div>

        <div className="d-flex align-items-center">
            <h6 className="text-white mb-0 mt-0">Last Month</h6>
        </div>

        </div>
        </>
    )
}

export default DashboardBox;