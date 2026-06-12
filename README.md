# CloudPix

A full stack image management app where you can browse, search, add, edit and view album images.
Built with React frontend, Express/Node backend, MongoDB database and JWT-based authentication.

---

## Demo Link

[Live Demo](https://cloud-pix-six.vercel.app/albums)

---

## Login

> **Google OAuth**

---

## Quick Start

```
git clone https://github.com/rahulCode1/CloudPix.git
cd CloudPix
npm install
npm npm start
```

---

## Technologies

- React JS
- React Router
- Node JS
- MongoDB
- JWT

---

## Demo Video

Watch a walkthrough(3-4 minutes) of all the major features of this app:
[Loom Video](https://drive.google.com/file/d/1xG_8DQtdxO0yZtdDvDjYMRUOlJnXLFxC/view?usp=sharing)

---

## Features

**Home**

- Display a list of all albums
- Create new album
- Edit existing album
- View album

**Album Details**

- View all images that added to album
- Search images via tags
- Mark or Unmark images as favorite
- Allow other user to see that album
- Delete album
- Copy album Url

**Image Details**

- See image releted information(Person name, tags, tag as favorite or not)
- Write comments
- Delete image

**Add Album**

- Add new album

**Add Image**

- Select existing album
- Add image information
- Select image

**Authentication**

- Google OAuth2.0 (Login with google)
- Protected routes for add, editing album and images

---

## API Reference

### **GET /api/albums**<br>

List all albums<br>
Sample Response:<br>

```
[
    {
        _id,
        name,
        description,
        ...
    },
    ...
]
```

### **POST /api/albums**<br>

Add new Ablum<br>
Sample Response:<br>

```

    {
        _id,
        name,
        description,
        ...
    }


```

### **PUT /api/albums/:albumId**<br>

Update album<br>
Sample Response:<br>

```

    {
        _id,
        name,
        description,
        ...
    }


```

### **PUT /api/albums/:albumId/share**<br>

Allow other user to see your album<br>
Sample Response:<br>

```

    {
        _id,
        emails: ["user1@gmail.com", ...]
    }


```

### **GET /api/albums/:albumId/favorites**<br>

Get all favourite images in your album<br>
Sample Response:<br>

```
[
    {
        _id,
       name,
       imageUrl,
       isFavorite,
       ...
    },
    ...

]
```

### **DELETE /api/albums/:albumId**<br>

Delete album<br>
Sample Response:<br>

```

    {
        _id,
        albumId
    }


```

### **GET /api/albums**<br>

List all images in an album<br>
Sample Response:<br>

```
[
    {
        _id,
        name,
        description,
        ...
    },
    ...
]
```

### **GET /api/image/:albumId/images/:imageId/details**<br>

Image details<br>
Sample Response:<br>

```

   {
        _id,
       name,
       imageUrl,
       isFavorite,
       ...
    }


```

### **POST /api/image/:albumId/images**<br>

Add new image in an album<br>
Sample Response:<br>

```

   {
        _id,
       name,
       imageUrl,
       isFavorite,
       ...
    },


```

### **PUT /api/image/:albumId/images/:imageId/favorite**<br>

Mark image as favorite in an album<br>
Sample Response:<br>

```

   {
        _id,
       name,
       imageUrl,
       isFavorite

    },


```

### **POST /api/image/:imageId/comments**<br>

Add comments on image.<br>
Sample Response:<br>

```

   {
        _id,
       comment

    }


```

### **DELETE /api/image/:albumId/images/:imageId/delete**<br>

Delete selected image form album.<br>
Sample Response:<br>

```
  {
        _id,
       imageId

    }

```

### **GET /api/users/users**<br>

List of all users<br>
Sample Response<br>

```
[
    {
        _id,
        email,
        name
    }
]
```

---

## Contact

For bugs or feature request, please reach out to rahulkumawat50665@gmail.com
