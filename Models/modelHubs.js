

const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    id : {
        type: String,
        required: [true, "Please id is required"],
        unique: true,

    },

    FirstName: {
        type: String,
        required: true
    },

    LastName: {
        type: String,
        required: true
    },

    dob: {
        type: Date,
        required: [true, "please the dob is required"],

    },

    date_created: {
        type: Date,
        default: Date.now
    }
})

const purchaseRequisitionSchema = new mongoose.Schema({
    id : {
        type: String,
        required: [true, "please the id is required"],
        unique: true
    }, 
    pr_number : {
        type: Number,
        defauld: 0
    },
    pr_date: {
        type: Date,
        required: [true, "Please the pr_date required"],
    },
    pr_amout: {
        type: Number,
        required: [true, "  Please the amount is required"]
    }, 
    pr_department: {
        type: String,
        required: [true, "Please the department is required"]
    },
    pr_approval_name:{
        type: String,
        required: [true, "please the approval name is required"]
    }, 
    pr_approval_date : {
        type: Date,
        default: Date.now
    }
})

const PurchaseOrderSchema = new mongoose.Schema({ 

    id : {
        type: String,
        required: [true, "The id is required"],
        unique: true
    },

    po_number :{
        type: Number,
        required: [true, "the  order number is required"],
        unique: true
    },
    po_date: {
        type: Date,
        required: [true, "The order date is required"]

    },
    po_amout : {
        type: Number,
        required: [true, "Please the amount is required"]
    },
    po_department: {
        type: String,
        required: [true, "Please the department is requred"]
    },

    po_approval_name : {
        type: String,
        required: [true, "The approval name is rquired"]
    },
    po_approval_date: {
        type: Date,
        default: Date.now
    }
})






const user = mongoose.model("User", userSchema);
const purchaseRequisition = mongoose.model("PurchaseRequisition", purchaseRequisitionSchema);
const PurchaseOrder = mongoose.model("PurchaseOrder", PurchaseOrderSchema)




module.exports = {
    user,
    purchaseRequisition,
    PurchaseOrder
}
