import { Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";

const HowItWorks = () => {
  return (
    <div className="my-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl ">How It Works:</h2>
        <p className="w-1/3 mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.{" "}
        </p>
      </div>
      <Timeline className="w-1/2 mx-auto">
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>Create Account</Timeline.Title>
            <Timeline.Body>
              Get access to over 20+ pages including a dashboard layout, charts,
              kanban board, calendar, and pre-order E-commerce & Marketing
              pages.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>Add Biodata</Timeline.Title>
            <Timeline.Body>
              All of the pages and components are first designed in Figma and we
              keep a parity between the two versions even as we update the
              project.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>Find Desire Biodata</Timeline.Title>
            <Timeline.Body>
              Get started with dozens of web components and interactive elements
              built on top of Tailwind CSS.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>Send Request For Contact</Timeline.Title>
            <Timeline.Body>
              Get started with dozens of web components and interactive elements
              built on top of Tailwind CSS.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>Get Contact & Start Meetup</Timeline.Title>
            <Timeline.Body>
              Get started with dozens of web components and interactive elements
              built on top of Tailwind CSS.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>Getting Marriage</Timeline.Title>
            <Timeline.Body>
              Get started with dozens of web components and interactive elements
              built on top of Tailwind CSS.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default HowItWorks;
