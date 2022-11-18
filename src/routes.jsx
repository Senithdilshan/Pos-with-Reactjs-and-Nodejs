import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import ViewStock from "./Pages/Stock/ViewStock/ViewStock"
import AddStock from "./Pages/Stock/AddStock/AddStock"
import AddWarehouse from "./Pages/Stock/AddWarehouse/AddWarehouse"
import AddnewBatch from "./Pages/Stock/AddBatches/AddnewBatch"
import AddUser from "./Pages/User/AddUser/AddUser"
import AddSupplier from "./Pages/Supplier/AddSupplier/AddSupplier"
import AddToStock from "./Pages/Stock/StockTable/AddToStock"
import ManageCustomers from "./Pages/Customer/ManageCustomers"
// import AddBill from "./Pages/Sales/AddBill/AddBill"
import AddGRN from "./Pages/Stock/AddGRN/AddGRN"
import ViewGRN from "./Pages/Stock/ViewGRN/ViewGRN"
import OutofStocks from "./Pages/Stock/OutofStock/OutofStock"
export const routes = [
    {
        path: '/login',
        Component: <Login/>
    },
    {
        path: '/',
        Component: <Home/>
    },
    {
        path: '/stock',
        Component: <ViewStock/>
    },
    {
        path: '/addstock',
        Component: <AddStock/>
    },
    {
        path: '/addwarehouse',
        Component: <AddWarehouse/>
    },
    {
        path: '/addbatch',
        Component: <AddnewBatch/>
    },
    
    {
        path: '/adduser',
        Component: <AddUser/>
    },
    {
        path: '/addsupplier',
        Component: <AddSupplier/>
    },
    {
        path:'addtostock',
        Component:<AddToStock/>
    },
    {
        path:'/manage-customers',
        Component: <ManageCustomers/>
    },
    {
        path:'/grn',
        Component: <AddGRN/>
    },
    {
        path:'/viewgrns',
        Component: <ViewGRN/>
    },
    {
        path:'/outofstock',
        Component: <OutofStocks/>
    }
    // {
    //     path: '/addbill',
    //     Component: <AddBill/>
    // },
    // {
    //     path: '/addbill/addcustomer',
    //     Component: <AddCustomer/>
    // },
    // {
    //     path: '/search-bill',
    //     Component: <SearchBill/>
    // }

]