import { connect, model } from 'mongoose';
import { User, UserSchema } from "./users/users.schema"

async function seed() {
  await connect("mongodb+srv://root:root@cluster0.8i370yw.mongodb.net/?appName=Cluster0");
  const User = model<User>('User', UserSchema);
  await User.deleteMany({});
  await User.create({ name: 'Bibek', email: "randomone@gmail.com" });
  await User.create({ name: 'Alice', email: "randomtwo@gmail.com" });
  await User.create({ name: 'Charlie', email: "charlie.brown@testdomain.org" });
  await User.create({ name: 'Diana', email: "diana.prince@testdomain.org" });
  await User.create({ name: 'Ethan', email: "ethan_hunt@mycorp.co" });
  await User.create({ name: 'Fiona', email: "fiona_glenne@mycorp.co" });
  await User.create({ name: 'George', email: "george@thecompany.net" });
  await User.create({ name: 'Hannah', email: "hannah.m@thecompany.net" });
  console.log('✅ Users seeded!');
  process.exit(0);
}

seed();