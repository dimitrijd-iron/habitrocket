![logo](https://raw.githubusercontent.com/dimitrijd-iron/habitrocket/develop/public/images/logo.png)

# HAbitRocket

## Description

Building and maintaining habits is tough, even tougher when you do it alone.

**HAbitRocket** is here to help. A cool app with a minimalist interface will help you tracking your progress and staying motivated.

Get daily reminders on your phone or email, appoint a friend as your accountability partner.

Punch in your wins everyday and soon your habit will become you! :rocket:

## User stories

- **Splash Screen** As users, we want to be welcomed by a pleasant and motivating splah page.
- **Registration** As users, we want a simple registration form.
- **Update Details** As users, we want a simple way to update our details and cancel our accout.
- **Your Habits** (habit dashboard) As users, we want a simple dashboard and one-tap acces for creating a new habit.
- **Create Your Habit** As users, we want to be able to:
  - select the habit frequency
  - how and when to be cued to action
  - add an accountability partner
- **Habit Tracker** As users, we want a simple, visual and satisfying way to see our progress and punch in our daily wins.

## Server Routes (back-end)

| **Method** | **Route**                         | **Description**                                | **Request - Body** |
| ---------- | --------------------------------- | ---------------------------------------------- | ------------------ |
| `GET`      | `/`                               | Splash screen route. Render `index` view.      |                    |
| `GET`      | `/signup`                         | Render `signup` view.                          |                    |
| `POST`     | `/private/signup`                 | Return `signup` form to server, start session. | `signupForm`       |
| `GET`      | `/login`                          | Render `login` view.                           |                    |
| `POST`     | `/private/:id/login`              | Return `login` form to server, start session.  | `loginForm`        |
| `GET`      | `/private/:id/update-details`     | Render `update-details` view.                  |                    |
| `POST`     | `/private/:id/update-details`     | Return `update-details` form to server.        | `signupForm`       |
| `GET`      | `/private/:id/habit-dashboard`    | Render `habit-dashboard` view.                 |                    |
| `GET`      | `/private/:id/habit-add`          | Render `habit-add` view.                       |                    |
| `POST`     | `/private/:id/habit-add`          | Return `habit-add` form to server.             | `habitForm`        |
| `GET`      | `/private/:id/habit-track/:habit` | Render `habit-track` view.                     |                    |
| `POST`     | `/private/:id/habit-track/:habit` | Return `habit-track` input to server.          | `trackForm`        |
| `POST`     | `https://tbd.tbd`                 | Call `API-tbd` for push notification.          | `pushApiForm`      |

- `signup-form: {name, phone, email, password, tc}`
- `login-form: {email, password}`
- `habit-form: {description, frequency, cueTime, cueMedium, apName, apEmail} // ap is accountability partner`
- `track-form: {punch}`
- `push-api-form: {}` _work in progress_

## Models

`User`

```javascript
{ email: { type: String, required: "Name is required" },
  name: { type: String, required: "Email is required", unique: true },
  password: { type: String, required: "Password is required" },
  phone: String,
  tc: { type: Boolean, required: true },
  dateTimeSignup: { type: Date, default: Date.now },
  dateTimeUpdate: { type: Date, default: Date.now },
  dateTimeLogin: { type: Date, default: Date.now },
}
```

`AccountabilityPartner`

```javascript
{ user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   email:  {type: String, required: "Email is required", unique: true },
   name: {type: String, required: "Name is required"},
   dateTimePush: { type: Date, default: Date.now },
   verified: { type: Boolean, required: true },
   dateTimeVerified: {type: Date, default: Date.now}
}
```

`Habit`

```javascript
{ user: [{ type: Schema.Types.ObjectId, ref: "User" }],
   description: String,
   dateTimeRegistered: { type: Date, default: Date.now },
   frequency: String,
   cueTime: String, // 07:77 format
   cueMedium: String,
   accountabilityPartner: {
     type: Schema.Types.ObjectId,
     ref: "AccountabilityPartner",
   },
   push: [{ type: Date, default: Date.now }],
   punch: [{ type: Date, default: Date.now }],
}
```



## Backlog

- Add SMS and WhatsApp notification with Twillio.
- Allow for selected day of the week habit frequency.
- Allow for intra-day habit frequency.
- Add report for the accountability partner.
- Add blockchained public / encrypted promise.
- Make it more "social".
- Gamify it.


## Links

#### Repositories 

Code: [Github](https://github.com/dimitrijd-iron/habitrocket)

App: [Heroku](https://habitrocket.herokuapp.com/)  *not yet available*


#### Wireframe
[Miro Board](https://miro.com/app/board/o9J_lUxa4bM=/)


#### Projet Management

[Trello Board](https://trello.com/b/OEMG3fxi/habitrocket)


#### Presentation

[Google Slides](https://docs.google.com/presentation/d/1PTTCqOrnPOnL0XoZPNJ_US6tZPRbf39xmgTVKkmftMU/edit?usp=sharing)  