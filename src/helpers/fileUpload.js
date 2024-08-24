

export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/pyaguari/upload'

    const formData = new FormData()
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)
    

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if (!resp.ok) throw new Error('Hubo un error al subir la imagen')

        const cloudResp = await resp.json()

        return cloudResp.secure_url
        
    } catch (error) {
        console.log(error)
        throw new Error('Error con la peticion')
    }
    
}