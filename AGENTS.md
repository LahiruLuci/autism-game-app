# Agent Instructions — Autism Child Game App

## Project Purpose

This project is the Child Game Application of the Autism Support Platform.

The app is built using Next.js and is used by parents and children. Parents complete a survey, the system predicts the child’s support/risk level, and then suitable games are unlocked for the child. The child plays games, and the scores are saved to Supabase. The parent portal will later use this saved data to show progress reports.

This app is not a medical diagnosis system. Use wording such as:
- support level
- screening result
- developmental support level
- suggested game level

Do not use wording such as:
- autism diagnosis
- confirmed autism level
- medical result

---

## Main Technology Stack

Use the following stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase for database and authentication
- React Konva for simple interactive games
- Phaser.js only if needed for advanced 2D game mechanics
- Recharts only if a small chart is needed inside the game app
- FastAPI ML API for prediction

---

## App Purpose

The Game App should handle:

1. Parent registration and login
2. Child profile creation
3. Survey completion
4. Sending survey result to ML API
5. Saving assessment result to Supabase
6. Unlocking games based on predicted level
7. Displaying available games
8. Running child-friendly games
9. Saving game scores
10. Showing simple result after each game

---

## Main App Routes

Use this route structure:

```txt
/
 /login
 /register
 /children
 /children/new
 /children/[childId]
 /survey/[childId]
 /assessment-result/[childId]
 /games/[childId]
 /games/[childId]/emotion-face-match
 /games/[childId]/situation-emotion-choice
 /games/[childId]/memory-card
 /games/[childId]/pattern-completion
 /games/[childId]/daily-routine-order
 /games/[childId]/feeling-need-choice
 /games/[childId]/count-objects
 /games/[childId]/number-match
 /game-result/[sessionId]


## Folder Structure

Use this structure:

app/
  login/
  register/
  children/
  survey/
  assessment-result/
  games/
  game-result/

components/
  auth/
  layout/
  children/
  survey/
  games/
  ui/

lib/
  supabase.ts
  auth.ts
  api.ts
  scoring.ts
  game-unlock.ts
  constants.ts

types/
  database.ts
  survey.ts
  game.ts
  assessment.ts

## Environment Variables

Use environment variables.

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ML_API_URL=http://localhost:8000

Never hardcode Supabase keys or API URLs inside components.

Never expose Supabase service role key in the frontend.

## Recommended Folder Structure

Use this structure:

app/
  page.tsx
  login/
    page.tsx
  register/
    page.tsx
  children/
    page.tsx
    new/
      page.tsx
    [childId]/
      page.tsx
  survey/
    [childId]/
      page.tsx
  assessment-result/
    [childId]/
      page.tsx
  games/
    [childId]/
      page.tsx
    [childId]/
      emotion-face-match/
        page.tsx
      situation-emotion-choice/
        page.tsx
      memory-card/
        page.tsx
      pattern-completion/
        page.tsx
      daily-routine-order/
        page.tsx
      feeling-need-choice/
        page.tsx
      count-objects/
        page.tsx
      number-match/
        page.tsx
  game-result/
    [sessionId]/
      page.tsx

components/
  auth/
    LoginForm.tsx
    RegisterForm.tsx
    LogoutButton.tsx
  layout/
    AppHeader.tsx
    AppShell.tsx
    MobileBottomNav.tsx
  children/
    ChildProfileCard.tsx
    ChildProfileForm.tsx
    ChildSelector.tsx
  survey/
    SurveyQuestionCard.tsx
    SurveySection.tsx
    SurveyProgressBar.tsx
    SurveySubmitButton.tsx
  games/
    GameCard.tsx
    GameGrid.tsx
    GameStartScreen.tsx
    GameResultCard.tsx
    GameInstructionCard.tsx
    TimerBadge.tsx
    ScoreBadge.tsx
  ui/
    Button.tsx
    Card.tsx
    Input.tsx
    LoadingState.tsx
    ErrorState.tsx
    EmptyState.tsx

lib/
  supabase.ts
  auth.ts
  api.ts
  scoring.ts
  game-unlock.ts
  survey-scoring.ts
  constants.ts
  validation.ts

types/
  database.ts
  child.ts
  survey.ts
  game.ts
  assessment.ts
  score.ts

## Page Routing Rules

Use this route structure:

/                         Landing page
/login                    Parent login
/register                 Parent registration
/children                 List child profiles
/children/new             Add child profile
/children/[childId]       Child profile details
/survey/[childId]         Parent survey
/assessment-result/[childId] Show latest assessment result
/games/[childId]          Game list and unlocked games
/games/[childId]/emotion-face-match
/games/[childId]/situation-emotion-choice
/games/[childId]/memory-card
/games/[childId]/pattern-completion
/games/[childId]/daily-routine-order
/games/[childId]/feeling-need-choice
/games/[childId]/count-objects
/games/[childId]/number-match
/game-result/[sessionId]  Result after game completion

If user is not logged in, redirect to:

/login

After login, redirect to:

/children

After survey completion, redirect to:

/assessment-result/[childId]

After viewing assessment result, user can go to:

/games/[childId]

## UI Design Direction

The app must be:

Calm
Friendly
Simple
Child-safe
Parent-friendly
Easy to understand
Soft and supportive
Not crowded

Use:

Rounded cards
Large buttons
Large touch targets
Soft shadows
Pastel colors
Simple icons
Clear instructions
Enough spacing
Friendly success messages

Avoid:

Crowded dashboards
Complex menus
Too many animations
Flashing effects
Aggressive colors
Long paragraphs
Medical-looking design
Scary warning messages
Small text
Small buttons

Recommended UI tone:

Friendly learning app, not hospital software.

## Responsive Design Requirements

This app must work well on:

Mobile phones
Tablets
Desktop browsers

Design mobile-first.

Mobile Rules

For mobile:

Use one-column layout
Use full-width cards
Use large buttons
Minimum button height: 48px
Avoid horizontal scrolling
Keep game area inside screen width
Keep survey questions simple
Prefer one question per card
Make answer options easy to tap
Keep bottom spacing for thumb reach
Use sticky bottom action button where useful

Example:

className="w-full px-4 py-4"

Tablet Rules

For tablet:

Use centered layout
Use wider cards
Use two-column grid only when helpful
Keep games centered
Keep instructions visible
Do not stretch canvas too large

Example:

className="grid grid-cols-1 md:grid-cols-2 gap-4"
Desktop Rules

For desktop:

Use max-width containers
Center main content
Avoid overly wide text
Use grid layouts for cards
Keep game canvas centered

Example:

className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"

## Accessibility Rules

Accessibility is very important because this project is related to children and neurodiversity.

Follow these rules:

Use clear readable fonts
Use good color contrast
Do not use color only to show meaning
Use labels with icons
Use keyboard accessible buttons
Add aria-label where needed
Avoid flashing effects
Avoid sudden loud sounds
Add mute option if sounds are used
Keep instructions short
Use simple words
Give positive feedback
Allow replay
Do not shame the child for wrong answers

Do not show:

You failed
Bad score
Poor performance
Wrong again

Use:

Good try
Nice work
Let’s try again
You are improving
Great effort

## Supabase Usage

Use Supabase for:

Authentication
Parent profile data
Child profile data
Survey questions
Survey responses
Assessment results
Game list
Game scores
Progress review data

Create Supabase client in:

lib/supabase.ts

Example:

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

Use Supabase Auth for login and register.

Do not manually store passwords.

## Survey Design

Survey route:

/survey/[childId]

Survey questions must be loaded from Supabase table:

survey_questions

Questions must be grouped by area:

emotion
cognitive
self_awareness
mathematical

Answer options:

Never = 0
Rarely = 1
Sometimes = 2
Often = 3
Always = 4

Survey UI rules:

Show progress bar
Show area name
Show one question card at a time or section-based cards
Use large radio buttons
Validate all required answers
Show clear submit button
Show loading state during submission

## Survey Scoring Logic

Calculate area scores:

emotion_score
cognitive_score
self_awareness_score
math_score
total_score

Example:

emotion_score = sum of all emotion answers
cognitive_score = sum of all cognitive answers
self_awareness_score = sum of all self_awareness answers
math_score = sum of all mathematical answers
total_score = all area scores combined

Create helper file:

lib/survey-scoring.ts

This helper should calculate scores and return an object:

{
  emotion_score: number;
  cognitive_score: number;
  self_awareness_score: number;
  math_score: number;
  total_score: number;
}

## Assessment Saving Flow

After survey submission:

Calculate scores
Send scores to ML API
Receive predicted level
Insert record into assessments
Insert all answers into survey_responses
Redirect to /assessment-result/[childId]

The assessment result page should show:

Screening completed
Suggested support/game level
Recommended game level
Continue to games button
Retake survey option

Do not show scary medical wording.

## Game Unlock Logic

Use latest assessment result.

Unlock rule:

If predicted_level = 1:
Unlock only level 1 games

If predicted_level = 2:
Unlock level 1 and level 2 games

If predicted_level = 3:
Unlock level 1, level 2, and level 3 games

Create helper file:

lib/game-unlock.ts

Example:

export function isGameUnlocked(gameLevel: number, predictedLevel: number) {
  return gameLevel <= predictedLevel;
}

Locked games should still be visible but disabled.

Locked game message:

This level will unlock after more progress.

## Game List Page

Route:

/games/[childId]

This page should:

Load child profile
Load latest assessment
Load all active games
Apply unlock logic
Show games grouped by area
Show locked/unlocked status
Allow child to start unlocked games only

Game card should show:

Game name
Area
Level
Short description
Locked/unlocked badge
Start button

## Game Areas

There are four development areas:

1. Emotion
2. Cognitive
3. Self-awareness
4. Mathematical Skills

Each area has:

2 games
3 levels per game

Total:

8 games
24 game levels

## Game Screen Requirements

Every game page should include:

Child name
Game name
Development area
Current level
Short instruction
Progress indicator
Score display
Timer if needed
Exit button
Mute button if sound is used

Basic layout:

Top:
Game title, level, score

Middle:
Game activity

Bottom:
Answer buttons or interaction area

## Game Scoring Logic

Create helper file:

lib/scoring.ts

Use common scoring formula:

final_score = correct_answers * 10 - wrong_answers * 3 - time_penalty

Rules:

Score cannot be below 0
Do not punish too harshly
Accuracy is more important than speed
Time penalty should be small
Level 3 can include stronger time factor

Example:

export function calculateScore({
  correctAnswers,
  wrongAnswers,
  timeTaken,
}: {
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: number;
}) {
  const timePenalty = Math.floor(timeTaken / 30);
  const rawScore = correctAnswers * 10 - wrongAnswers * 3 - timePenalty;
  return Math.max(rawScore, 0);
}

## Score Saving

After game completion, save to game_scores.

Required fields:

child_id
game_id
area
level
correct_answers
wrong_answers
attempts
time_taken
final_score
played_at

If saving fails:

Show:

We could not save the score. Please try again.

Do not lose the local result immediately. Keep the result on screen and allow retry.

## Game Result Screen

After each game, show positive result.

Show:

Great job!
Score
Correct answers
Time taken
Attempts
Play again
Back to games

Use supportive feedback:

Great effort!
Nice work!
You completed the activity!
Let’s practice again!

Avoid:

Failed
Bad
Poor
Wrong too many times

## Progress and Improvement Logic

The Game App should support progress tracking, but detailed reporting belongs to the Parent Portal.

The Game App can show simple messages:

You are improving
You completed this level
Try another game

Improvement should be measured by:

1. Game scores over time
2. Accuracy improvement
3. Time reduction
4. Lower wrong answers
5. Monthly parent re-survey

Do not change child level after only one good game.

Better logic:

Recommend next level only after consistent progress across multiple sessions.

## Monthly Re-Survey Support

Parent should be able to retake the survey.

Use survey retake for:

Monthly review
Progress comparison
Updated support/game level

Do not force retake every day.

Recommended:

Initial survey
Monthly re-survey
Optional manual retake

## Error Handling

Always handle:

Loading state
Empty state
Error state
No child profile
No survey questions
ML API error
Supabase insert error
No assessment found
No unlocked games

User-friendly errors:

Something went wrong. Please try again.
We could not load the questions.
We could not save the result.
Please check your connection.

Never display raw database or API errors to normal users.

## Loading States

Use simple loading messages:

Loading your profile...
Loading questions...
Preparing games...
Saving your score...
Calculating result...

Use skeleton cards where useful.

## Empty States

Examples:

No child profile:

No child profile found. Add a child profile to start.

No assessment:

Please complete the survey before playing games.

No game scores:

No game scores yet. Start a game to see progress.

## Security Rules

Important:

Never expose service role key
Use Supabase anon key only in frontend
Use Row Level Security before production
Parent should only access their own children
Parent should only see their own game scores
Validate child ownership before showing data
Do not trust only frontend checks

For now, during development, simple access can be used. But before final deployment, add RLS policies.

## Code Quality Rules

Write code that is:

Clean
Simple
Typed
Reusable
Easy to understand
Easy to debug

Use TypeScript types.

Avoid:

Huge components
Repeated logic
Hardcoded IDs
Magic numbers
Direct API calls scattered everywhere
Complex nested conditions

Prefer helper functions:

lib/scoring.ts
lib/game-unlock.ts
lib/survey-scoring.ts
lib/api.ts

## Component Rules

Create reusable components for repeated UI.

Recommended components:

Button
Card
Input
LoadingState
ErrorState
EmptyState
SurveyQuestionCard
SurveyProgressBar
ChildProfileCard
GameCard
GameGrid
GameStartScreen
GameResultCard
ScoreBadge
TimerBadge

## Mobile and Tablet Game Rules

For mobile/tablet games:

Use tap interactions where possible
Use drag/drop only if targets are large
Keep objects large
Use full-width buttons
Avoid tiny icons
Avoid needing precise mouse movement
Keep the game inside viewport
Do not require keyboard
Make replay easy
Keep instructions visible

Minimum touch target:

48px height and width

## Final Quality Target

The final Game App should feel like:

A calm, simple, supportive child learning platform.

It should not feel like:

A medical diagnosis system.
A complex admin dashboard.
A stressful exam system.
A fast arcade game.

The app should help parents guide children through supportive activities and measure progress using survey results and game performance.



