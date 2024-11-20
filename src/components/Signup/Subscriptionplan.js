import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Container,
  List,
  ListItem,
  ListItemIcon,
  Divider
} from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { GoCheckCircle } from "react-icons/go";
import Switch from "@mui/material/Switch";
import Header from "../Header/header";
import { BsLayers } from "react-icons/bs";
import { SlLayers } from "react-icons/sl";
import { IoFlashOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { LuRocket } from "react-icons/lu";
import { CardHeader } from "@mui/material"; // Import CardHeader

const label = { inputProps: { "aria-label": "Switch demo" } };

const SubscriptionPlan = () => {
  const steps = [
    {
      label: "Your details",
      icon: <AiOutlineExclamationCircle />,
      description: "Provide an email and password"
    },
    {
      label: "Subscription plans",
      icon: <SlLayers />,
      description: "Select a plan that suits you"
    },
    {
      label: "Payment methods",
      icon: <MdOutlinePayment />,
      description: "Add your payment details"
    },
    {
      label: "Welcome to Pathly",
      icon: <LuRocket />,
      description: "Get up and running"
    }
  ];

  const plans = [
    {
      title: "Essential Plan",
      price: "$15",
      icon: <BsLayers />,
      points: [
        "Access to selected courses",
        "Limited Book Clup Participition",
        "Basic AI guidance from pathly",
        "Introductory course & community recommedations",
        "Public community access for learning & networking"
      ]
    },
    {
      title: "Premium Plan",
      price: "$45",
      icon: <SlLayers />,
      points: [
        "Full access to most courses",
        "Enhanced Pathly recommendations",
        "Pathly career-focused guidance",
        "Custom learning paths",
        "Access to multiple Book Clubs",
        "Exclusive community groups for networking",
        "Invitations to live webinars & workshops"
      ]
    },
    {
      title: "Pro Plan",
      price: "$90",
      icon: <IoFlashOutline />,
      points: [
        "Unlimited access to all courses",
        "Mentorship and exclusive content",
        "Full use of Pathly’s AI guidance with in-depth career recommendations",
        "VIP Book Club access",
        "Priority webinar seating, and exclusive networking events",
        "Priority customer support and career coaching options"
      ]
    }
  ];

  return (
    <div className="subscription-plan-wrapper" style={{padding:"50px"}}> 
      <div className="subscription-plan-container">
        <Container>
          <Header />
          <Typography
            variant="h5"
            component="h1"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
          >
            Subscription Plans
          </Typography>
          <Typography sx={{ textAlign: "center", mb: 4 }}>
            <Switch {...label} disabled />
            Pay annually and Save up to 10%
          </Typography>
          {/* Cards for Subscription Plans */}
          <Grid container spacing={3}>
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: 3,
                    height: "400px", // Set a fixed height for the cards
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  {/* Card Header */}
                  <CardHeader
                    avatar={React.cloneElement(plan.icon, { size: 30 })}
                    title={
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {plan.title}
                      </Typography>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {plan.price}{" "}
                      <span style={{ fontWeight: "normal", fontSize: "15px" }}>
                        per month
                      </span>
                    </Typography>

                    {/* Points List */}
                    <List>
                      {plan.points.map((point, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon>
                            <GoCheckCircle color="blue" />
                          </ListItemIcon>
                          <Typography variant="body2">{point}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      {/* Footer with Stepper */}
      <div className="footer" style={{marginTop:"10%"}} >
        <Stepper alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                icon={React.cloneElement(step.icon, {
                  size: 20
                })}
              >
                <div style={{ textAlign: "center" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {step.description}
                  </Typography>
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
