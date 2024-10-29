const { log } = require('node:console');
const {open, watch, write} = require('node:fs/promises');
const fs = require('node:fs/promises');


const createFile = async ([path, content]) => {
    try{
        const existingFileHandler = await fs.open(path, 'r')
        if(existingFileHandler){
            await existingFileHandler.write(content)
            await existingFileHandler.close()
        }
        console.log(path, 'file exists already........')

    }catch{
       const newFileHandle  = await fs.open(path, 'w')
      await newFileHandle.write(content)
     await newFileHandle.close()

        console.log(newFileHandle)
    }
}

const executeCommand = async (command) => {
    if(command.includes('create file')){
        await createFile(command.split(':').slice(1))
    }
}

const execute = async() => {
    try {
        const commandFileHandler  = await open('./command.txt')
        commandFileHandler.on('change', async()=> {
            const {size} =  (await commandFileHandler.stat())
            const offset = 0;
            const position = 0;
            const length = size
            const buff = Buffer.alloc(size)
            const content = await commandFileHandler.read(buff,offset,length,position)
            const command = buff.toString('utf8')
            await executeCommand(command)

        })

        const watching = await watch('./command.txt')
        for await (event of watching){
            console.log(event)
            if(event.eventType == 'change'){
                commandFileHandler.emit('change')
            }
        }




    }catch(err){
        console.log(err)
    }
}

execute()


