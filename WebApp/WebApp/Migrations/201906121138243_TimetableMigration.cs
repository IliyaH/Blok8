namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TimetableMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Timetables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Departures = c.String(),
                        IdLine = c.Int(nullable: false),
                        IdDay = c.Int(nullable: false),
                        IdBusLineType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BusLineTypes", t => t.IdBusLineType, cascadeDelete: true)
                .ForeignKey("dbo.Days", t => t.IdDay, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.IdLine, cascadeDelete: true)
                .Index(t => t.IdLine)
                .Index(t => t.IdDay)
                .Index(t => t.IdBusLineType);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Timetables", "IdLine", "dbo.Lines");
            DropForeignKey("dbo.Timetables", "IdDay", "dbo.Days");
            DropForeignKey("dbo.Timetables", "IdBusLineType", "dbo.BusLineTypes");
            DropIndex("dbo.Timetables", new[] { "IdBusLineType" });
            DropIndex("dbo.Timetables", new[] { "IdDay" });
            DropIndex("dbo.Timetables", new[] { "IdLine" });
            DropTable("dbo.Timetables");
        }
    }
}
