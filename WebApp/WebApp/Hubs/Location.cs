using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using WebApp.Models;
using WebApp.Persistence;

namespace WebApp.Hubs
{
    [HubName("Location")]
    public class Location : Hub
    {
        ApplicationDbContext db = new ApplicationDbContext();


        public void Hello(List<Station> stations)
        {
            foreach (var v in stations)
            {
                double[] temp0 = { v.XCoordinate, v.YCoordinate };
                Clients.All.hello(temp0);
                Thread.Sleep(2000);

            }


            //i++;
            //Task.Run(() => Stations(stations));
            /*for (int i = 0; i < stations.Count-1; i++)
            {
                double startX = stations[i].XCoordinate;
                double startY = stations[i].YCoordinate;
                double endX = stations[i + 1].XCoordinate;
                double endY = stations[i + 1].YCoordinate;

                double xStep = (endX - startX) / 10;
                double yStep = (endY - startY) / 10;

                for(int j =0; j < 10; j++)
                {
                    if(j == 0)
                    {
                        double[] temp0 = { startX , startY};
                        Clients.All.hello(temp0);
                        Thread.Sleep(1000);
                    }
                    else
                    {
                        double[] temp1 = { (startX + xStep), (startY + yStep) };
                        Clients.All.hello(temp1);
                        Thread.Sleep(1000);
                    }
                }
            }*/

        }


        }
}