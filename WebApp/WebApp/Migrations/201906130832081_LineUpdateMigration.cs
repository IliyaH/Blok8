namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LineUpdateMigration : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Timetables", "IdBusLineType", "dbo.BusLineTypes");
            DropIndex("dbo.Timetables", new[] { "IdBusLineType" });
            AddColumn("dbo.Lines", "LineType", c => c.Int(nullable: false));
            DropColumn("dbo.Timetables", "IdBusLineType");
            DropTable("dbo.BusLineTypes");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.BusLineTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LineType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Timetables", "IdBusLineType", c => c.Int(nullable: false));
            DropColumn("dbo.Lines", "LineType");
            CreateIndex("dbo.Timetables", "IdBusLineType");
            AddForeignKey("dbo.Timetables", "IdBusLineType", "dbo.BusLineTypes", "Id", cascadeDelete: true);
        }
    }
}
