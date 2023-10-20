import Task from "./model.js";

async function POST_create(req, res) {
    const { title, content, duration, status, note, owner } = req.body;

    try {
        let myTask = await new Task({
            title: title,
            content: content,
            duration: duration,
            status: status,
            note: note,
            owner: owner
        }).save();
    
        return res.json({
            success: true,
            status: 200,
            msg: `Created success`,
            data: myTask
        })
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            msg: `Error`
        })
    }
}



async function DELETE_task(req, res) {
    const { _id } = req.params;

    try {
        let result = await Task.findByIdAndDelete(_id);

        return res.json({
            success: true,
            status: 200,
            msg: `Deleted Success`,
            data: result
        })
    } catch (error) {
       return res.json({
        success: false,
        status: 500,
        msg: `Error`
       })
    }
}

async function PUT_update_task(req, res) {
    const { _id, title, content, duration, note, status } = req.body;

    try {
        let updateTask = await Task.findByIdAndUpdate(_id);

        updateTask.title = title || updateTask.title,
        updateTask.content = content || updateTask.content,
        updateTask.duration = duration || updateTask.duration,
        updateTask.note = note || updateTask.note,
        updateTask.status = status || updateTask.status

        await updateTask.save();

        return res.json({
            success: true,
            status: 200,
            msg: `Updated`
        })
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            msg: error
        })
        
    }
}

async function GET_find_one(req, res) {
    const { _id } = req.params;

    try {
        let result = await Task.findById(_id).populate({path: "owner"});
        
        return res.json({
            success: true,
            status: 200,
            msg: `Found`,
            data: result
        })
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            msg: error
        })
    }
}

async function GET_find_many(req, res) {
    const {owner} = req.params;

    try {
        let result = await Task.find({
            owner: owner
        }).populate({path: 'owner'});

        return res.json({
            success: true,
            status: 200,
            msg: `Found many items`,
            data: result
        })
    } catch (error) {
        return res.json({
            success: false,
            status: 404,
            msg: error
        })
    }
}

export { POST_create, DELETE_task, PUT_update_task, GET_find_one, GET_find_many } 

