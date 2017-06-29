import Navbar from './navbar/navbar.module';
import Hero from './hero/hero.module';
import User from './user/user.module';
import ChatBox from './chatBox/chatBox.module';

export default angular.module('app.common', [Navbar, Hero, User, ChatBox]).name
