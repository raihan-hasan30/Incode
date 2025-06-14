# In-code

---

## 🎯 Product Vision:

> Developers often forget syntax despite understanding the concept.
>
> **Incode** helps developers build **muscle memory** by **typing and practicing real-world commands and code snippets**, making them faster, more confident, and job-ready.

---

## 🧩 Core Problems Solved:

- Forgetting syntax while coding
- Weak command-line memory (Docker, Git, etc.)
- Lack of engaging practice tools for programmers
- Boring traditional cheat sheets / tutorials

---

## 🛠️ Target Users:

| User Type             | Description                              |
| --------------------- | ---------------------------------------- |
| 👨‍💻 Junior Developers  | Learning new tech stacks or tools        |
| 🔄 Career Switchers   | Need rapid, muscle memory based training |
| 🧪 DevOps Enthusiasts | Practicing CLI tools like Docker, Git    |
| 👨‍🏫 Instructors        | Recommending modern training method      |

---

## 🚀 Core Features (MVP - Phase 1):

| Feature                | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| 🏠 Landing Page        | Welcome users with key app benefits and CTA to Sign up.                   |
| 🔐 Authentication      | Email login or OAuth (Google, GitHub)                                     |
| 📚 Topic Selection     | Choose topics (e.g., Docker, Git, Bash)                                   |
| 🎯 Practice Mode       | Show a command and description → User types → Instant feedback highlights |
| ⚔️ Battle Mode (Basic) | Questions with no hints → User types full commands                        |
| 📈 Result Summary      | Typing speed, accuracy, XP, mistakes per session                          |
| 👤 Profile (Simple)    | Show XP, badges, and recent practice results                              |

---

---

---

## 1️⃣ বিস্তারিত User Journey

১. **User Acquisition & Landing**

- **Marketing → Landing Page**
  - Success: “Get Started” বাটন ক্লিক
  - Edge: Banner বা CTA লোড না হলে → להשתמש במקום אחר CTA
- **Error**: CDN/Asset fail → simple HTML fallback

２. **Sign Up / Login**

- **Flows**:
  - Email/Password
  - OAuth (GitHub, Google)
- **States & Edge Cases**:
  - Loading (spinner)
  - Invalid creds → inline error under input
  - Network fail → “Try again” snackbar + retry button
  - Email not verified → resend verification link
  - Password reset → success/fail messages

３. **Email Verification**

- Success → auto-redirect to Topic Selection
- Token expired/invalid → “Resend link” CTA

４. **Topic Selection**

- List/Grid view of topics (Docker, Git, Bash…)
- **Edge Cases**:
  - Empty list (no topics) → “Coming soon” placeholder
  - Fetch error → “Retry” button
- **Bonus**: Search/filter by name

５. **Topic Detail & Mode Choice**

- Show Topic overview + two big buttons: Practice / Battle
- **Locked Topic** (Phase 2 unlockable) → grayscale + “Unlock at Level X” tooltip
- **Edge**: User clicks Practice but topic not yet unlocked → modal explaining unlock criteria

６. **Practice Mode**

- **Flow**:
  1. Fetch random command + description
  2. User types in editor field
  3. Per‐char highlight: ✅/❌
  4. On complete → auto‐advance or “Next” button
- **States & Edge Cases**:
  - Initial load → placeholder skeleton
  - Typing session timeout/inactivity → warn “Resume?” modal
  - Server error fetching command → retry icon
  - User refresh mid‐session → offer “Resume previous session?”
  - Exceeded typo limit → gentle “Hint” option (Phase 2)

７. **Battle Mode (Basic)**

- **Flow**:
  1. Show question (e.g., “Show all Docker images”)
  2. User types full command
  3. On submit → check exact match
- **Edge Cases**:
  - Wrong answer → show correct syntax + “Try again” / “Skip”
  - No attempts left → auto‐move to next question
  - Slow network → disable submit until ready

８. **Session Complete → Results Summary**

- **Data Shown**: WPM, Accuracy %, Errors count, XP earned
- **Edge Cases**:
  - Save‐to‐server fail → “We couldn’t save your results, retry?”
  - Share to social (LinkedIn/Twitter) fail → fallback link copy
- **Success Path**: “View Profile” / “Practice Again” CTA

９. **Profile Page**

- **Sections**:
  - Basic Info, XP, Level, Streak
  - Recent Sessions list
- **Edge Cases**:
  - Data load error → “Try refreshing”
  - No sessions yet → “Start practising now!” placeholder

🔟 **Global Flows & Error Pages**

- **404 Page**: helpful links back to Landing/Topics
- **500 Page**: “Something went wrong” + Contact support
- **Offline**: “You appear offline—check your connection”

---

## 2️⃣ Core Web Pages List (Phase 1 & 2ের জন্য)

| Page / Route             | Purpose                                             | Primary States                                 | Edge Cases / Variations                 |
| ------------------------ | --------------------------------------------------- | ---------------------------------------------- | --------------------------------------- |
| **🏠 /** Landing Page    | App overview + CTA                                  | Normal / Loading / Error                       | CDN fail, no-js fallback                |
| **/auth/login**          | Login form / OAuth buttons                          | Idle / Loading / Error                         | Invalid creds, network error            |
| **/auth/register**       | Sign‑up form                                        | Idle / Loading / Error                         | Email in use, weak password             |
| **/auth/verify?token=…** | Email verification                                  | Verifying / Success / Invalid                  | Token expired, resend link              |
| **/topics**              | Topic catalog                                       | Loaded / Empty / Error                         | No topics, fetch fail                   |
| **/topics/[id]**         | Topic detail & mode choice                          | Idle / Loading / Error                         | Topic locked, not found                 |
| **/practice/[topicId]**  | Practice Mode session                               | Loading command, Typing, Submitting, Completed | Session resume, server fail, timeout    |
| **/battle/[topicId]**    | Battle Mode session                                 | Loading question, Typing, Submit, Completed    | Attempts exhausted, skip, server error  |
| **/results/[sessionId]** | Session result summary                              | Loading / Display / Error                      | Save fail, share fail                   |
| **/profile**             | User dashboard (XP, Level, Streak, Recent Sessions) | Loading / Display / Empty                      | Not logged in (redirect to /auth/login) |
| **/404**                 | Not Found                                           | Static                                         | Link back to Home, Search               |
| **/500**                 | Server Error                                        | Static                                         | Contact support link                    |

> Phase 2 এ যুক্ত হবে:
>
> `/achievements` (Badges) | `/leaderboard` | `/challenges/daily` | `/settings` | `/subscription` (payment)
