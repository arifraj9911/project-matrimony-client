import { Timeline } from "flowbite-react";
import {
  HiOutlinePhone,
  HiOutlineTrendingUp,
  HiSearch,
  HiUserAdd,
  HiUserCircle,
  HiUsers,
} from "react-icons/hi";

const HowItWorks = () => {
  return (
    <div className="my-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">How It Works:</h2>
        <p className="w-1/3 mx-auto">See how can you find your mate!!!</p>
      </div>
      <Timeline className="w-1/2 mx-auto">
        <Timeline.Item>
          <Timeline.Point icon={HiUserCircle} />
          <Timeline.Content>
            <Timeline.Title>Create Account</Timeline.Title>
            <Timeline.Body>
              First you need to create/login to this website with your email.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiUserAdd} />
          <Timeline.Content>
            <Timeline.Title>Add Biodata</Timeline.Title>
            <Timeline.Body>
              Add your biodata from dashboard edit biodata page.It can create
              your biodata and add in the server so that someone can find you as
              you want.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiSearch} />
          <Timeline.Content>
            <Timeline.Title>Find Desire Biodata</Timeline.Title>
            <Timeline.Body>
              Find your desire biodata on the biodata page. Your can filtered
              search for finding your choosen one.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiOutlineTrendingUp} />
          <Timeline.Content>
            <Timeline.Title>Send Request For Contact</Timeline.Title>
            <Timeline.Body>
              Send request for contact information, it cost 5$. If you are
              premium member, you directly get the contact info in the details
              page.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiOutlinePhone} />
          <Timeline.Content>
            <Timeline.Title>Get Contact & Start Meetup</Timeline.Title>
            <Timeline.Body>
              After getting contact then you can connect to your desire person.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiUsers} />
          <Timeline.Content>
            <Timeline.Title>Getting Marriage</Timeline.Title>
            <Timeline.Body>
              If all things going well, you can express your feelings and get
              married.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default HowItWorks;
