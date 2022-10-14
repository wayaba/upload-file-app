import { useState } from 'react'

const FileUploader = () => {
  const [files, setFiles] = useState({})

  const handleUploadFile = (e) => {
    const { files: newFiles } = e.target
    if (newFiles.length) {
      for (let file of newFiles) {
        files[file.name] = file
      }
      setFiles({ ...files })
    }
  }

  const handlerRemove = (fileName) => {
    delete files[fileName]
    setFiles({ ...files })
  }

  return (
    <div className="flex flex-col">
      <div className="text-center sm:w-1/2 lg:w-1/3 bg-[#edf2f4] shadow-md rounded-xl p-6 mx-auto mt-10 justify-center">
        <input type="file" onChange={handleUploadFile} />
      </div>
      <div className="grid grid-cols-3 auto-cols-max  items-center">
        {Object.keys(files).map((fileName, index) => {
          let file = files[fileName]
          let isImageFile = file.type.split('/')[0] === 'image'
          return (
            <div
              className=" bg-green-300 rounded-xl shadow-lg p-6 m-4"
              key={fileName}
            >
              {isImageFile ? (
                <img
                  className="object-cover mx-auto my-3 h-36 w-36 rounded-full  bg-white content-center"
                  src={URL.createObjectURL(file)}
                  alt={`file preview ${index}`}
                />
              ) : (
                <div>NO IMAGE</div>
              )}
              <div className="flex flex-col">
                <span className="m-1 p-1 font-bold border-solid bg-blue-300 rounded-lg shadow-lg text-center text-white font-mono ">
                  Nombre: {file.name}
                </span>
                <span className="m-1 p-1 font-bold border-solid bg-blue-300 rounded-lg shadow-lg text-center text-white font-mono ">
                  Tamaño: {file.size} kb
                </span>
                <button
                  onClick={() => handlerRemove(fileName)}
                  className="m-1 p-1 font-bold border-solid bg-red-600 rounded-lg shadow-lg text-center text-white font-mono hover:bg-red-400 active:bg-red-800 "
                >
                  Borrar
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FileUploader
