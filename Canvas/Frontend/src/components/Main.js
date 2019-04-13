import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Mysql from './Mysql/Mysql';
import File from './File/File';
import Pdf from './Pdf/Pdf';
import Profile from './Profile/Profile';
import Course from './Course/Course';
import CreateCourse from './CreateCourse/CreateCourse';
import Enroll from './Enroll/Enroll';
import Student from './Student/Student';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import StudentAssignment from './StudentAssignment/StudentAssignment';
import SubmissionView from './SubmissionView/SubmissionView';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';
import Grade from './Grade/Grade';
import CreateAssign from './CreateAssign/CreateAssign';
import Announcement from './Announcement/Announcement';
import Quiz from './Quiz/Quiz';
import StudentQuiz from './StudentQuiz/StudentQuiz';
import StudentQuizView from './StudentQuizView/StudentQuizView';
import QuizGrade from './QuizGrade/QuizGrade';
import CreateLecture from './CreateLecture/CreateLecture';
import Mail from './Mail/Mail';



import Navbar from './LandingPage/Navbar';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
       
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/>
                <Route path="/mysql" component={Mysql}/>
                <Route path="/file" component={File}/>
                <Route path="/pdf" component={Pdf}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/course" component={Course}/>
                <Route path="/createcourse" component={CreateCourse}/>
                <Route path="/enroll" component={Enroll}/>
                <Route path="/student" component={Student}/>
                <Route path="/studentdashboard" component={StudentDashboard}/>
                <Route path="/studentassignment" component={StudentAssignment}/>
                <Route path="/submissionview" component={SubmissionView}/>
                <Route path="/teacherdashboard" component={TeacherDashboard}/>
                <Route path="/grade" component={Grade}/>
                <Route path="/createassign" component={CreateAssign}/>
                <Route path="/announcement" component={Announcement}/>
                <Route path="/quiz" component={Quiz}/>
                <Route path="/studentquiz" component={StudentQuiz}/>
                <Route path="/studentquizView" component={StudentQuizView}/>
                <Route path="/quizgrade" component={QuizGrade}/>
                <Route path="/createlecture" component={CreateLecture}/>
                <Route path="/mail" component={Mail}/>
            </div>
         
        )
    }
}
//Export The Main Component
export default Main;